import React from "react"
import Head from "next/head"
import {
    Segment,
    Grid,
    Form,
    Header,
    Image,
    Icon,
    Button,
    Input,
    Dropdown,
    Divider,
    Popup,
    Checkbox,
    Message
} from "semantic-ui-react"
import Navbar from "@/components/layout/navbar"
import { useState, createRef } from "react"
import Compressor from "compressorjs"
import axios from "axios"

import {
    DateInput,
    TimeInput,
} from "semantic-ui-calendar-react"

import { countryOptions } from "@/assets/countries"
import { categories } from "@/assets/eventCategories"
import { types } from "@/assets/eventTypes"
import { extensions } from "@/assets/phoneExtensions"
import InsertEvent from "@/firebase/event/createEvent"

export default function CreateEvent() {

    const [value, setValue] = useState({
        eventName: "",
        eventPhone: "",
        eventEmail: "",
        eventVenue: "",
        eventStreet: "",
        eventCity: "",
        eventProvince: "",
        eventDetails: ""
    })
    const [eventCategory, setCategory] = useState()
    const [eventType, setType] = useState([])
    const [eventCountry, setCountry] = useState()
    const [phoneExt, setExt] = useState()

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    const [image, setImage] = useState()
    const [prevUrl, setPrevUrl] = useState()

    const [tickets, setTickets] = useState(false)

    const [error, setError] = useState()
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const onChange = (e) => {
        const { value, name } = e.target;
        setValue(prevState => ({ ...prevState, [name]: value }));
    }

    const fileInputRef = createRef()

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0]
            new Compressor(image, {
                quality: 0.8,
                success: (compressedImage) => {
                    setImage(compressedImage)
                    setPrevUrl(URL.createObjectURL(compressedImage))
                }
            })
        }
    }

    const url = "https://api.opencagedata.com/geocode/v1/json?q="

    const onCreate = async () => {
        setLoading(true)
        setError()
        setSuccess(false)
        if (!image) {
            setLoading(false)
            setError("No image selected, please choose an image for your event")
            return
        }
        //Bad practise .. Line exceeds 80 characters .. 
        const geoLocation = url + `${value.eventStreet} ${value.eventCity} ${value.eventProvince} ${eventCountry}` + "&key=" + process.env.NEXT_PUBLIC_OPENCAGE_API_KEY + "&pretty=1" + "&no_annotations=1"

        await axios.get(geoLocation).then((res) => {
            const data = {
                ...value,
                eventCategory,
                eventType,
                eventCountry,
                phoneExt,
                startDate,
                startTime,
                endDate,
                endTime,
                tickets,
                lng: res.data.results[0].geometry.lng,
                lat: res.data.results[0].geometry.lat
            }
            InsertEvent(image, data).then(() => {
                setLoading(false)
                setSuccess(true)
                setValue("")
                setCategory()
                setType([])
                setExt()
                setStartDate("")
                setEndDate("")
                setStartTime("")
                setEndTime("")
                setTickets(false)
            })
        }).catch((e) => {
            setLoading(false)
            console.log(e)
        })
    }

    return (
        <>
            <Head>
                <title>Create Event | Envy</title>
            </Head>
            <Navbar>
                <Segment raised padded>
                    <Grid container centered stackable padded>
                        <Form onSubmit={onCreate} loading={loading} error success>
                            {error &&
                                <Message
                                    error
                                    header='Incomplete Form'
                                    content={error}
                                />
                            }
                            {success &&
                                <Message
                                    success
                                    header='Event Created Successfully'
                                    content='You have successfully created an event'
                                />
                            }
                            <Header>
                                <Icon name='text cursor' color='grey' />
                                <Header.Content>Basic Information</Header.Content>
                                <Header.Subheader>Give your event live by attracting your event-goers with suitable inspiring title, tags & featured details that make your event unique.</Header.Subheader>
                            </Header>
                            <Form.Field required>
                                <label>Event Title</label>
                                <input
                                    placeholder='Title'
                                    name='eventName'
                                    value={value.eventName}
                                    onChange={onChange}
                                    required
                                />
                            </Form.Field>
                            <Form.Group>
                                <Form.Dropdown
                                    selection 
                                    label='Event Category'
                                    placeholder='Category'
                                    required options={categories}
                                    value={eventCategory}
                                    onChange={(e, { value }) => { setCategory(value) }}
                                />
                                <Form.Dropdown
                                    selection
                                    multiple
                                    label='Event Type'
                                    placeholder='Type'
                                    required
                                    options={types}
                                    value={eventType}
                                    onChange={(e, { value }) => { setType(value) }}
                                />
                            </Form.Group>
                            <Divider />
                            <Header>
                                <Icon name='map marker alternate' color='grey' />
                                <Header.Content>Location Information</Header.Content>
                                <Header.Subheader>Make your {"event's"} location know to the attendees &amp; the surrounding community</Header.Subheader>
                            </Header>
                            <Form.Field required width={10}>
                                <label>Event Venue</label>
                                <input
                                    placeholder="Venue"
                                    name='eventVenue'
                                    value={value.eventVenue}
                                    onChange={onChange}
                                    required
                                />
                            </Form.Field>
                            <Form.Input
                                label='Street Address'
                                placeholder='Street Address'
                                name='eventStreet'
                                value={value.eventStreet}
                                onChange={onChange}
                                required
                            />
                            <Form.Group>
                                <Form.Input
                                    label='City'
                                    placeholder='City'
                                    required
                                    name='eventCity'
                                    value={value.eventCity}
                                    onChange={onChange}
                                />
                                <Form.Input
                                    label='State/Province'
                                    placeholder='State/Province'
                                    required name='eventProvince'
                                    value={value.eventProvince}
                                    onChange={onChange}
                                />
                            </Form.Group>
                            <Form.Select
                                label='Country'
                                placeholder='Country'
                                required
                                width={6}
                                name='eventCountry'
                                value={eventCountry}
                                options={countryOptions}
                                onChange={(e, { value }) => { setCountry(value) }}
                            />
                            <Divider />
                            <Header>
                                <Icon name='calendar alternate outline' color='grey' />
                                <Header.Content>Date and Time</Header.Content>
                                <Header.Subheader>Tell your event-goers when your event starts &amp; ends with precise times to help them plan for your event ahead of time.</Header.Subheader>
                            </Header>
                            <Form.Group>
                                <DateInput
                                    label='Start Date'
                                    clearable
                                    name="startDate"
                                    minDate={"2070-01-31"}
                                    placeholder="Start Date"
                                    dateFormat="DD MMM YYYY"
                                    value={startDate}
                                    iconPosition="left"
                                    onChange={(e, { value }) => { setStartDate(value) }}
                                    required
                                    hideMobileKeyboard={true}
                                    closable={true}
                                />
                                <TimeInput
                                    label='Start Time'
                                    clearable
                                    name="startTime"
                                    placeholder="Start Time"
                                    timeFormat="AMPM"
                                    value={startTime}
                                    iconPosition="left"
                                    onChange={(e, { value }) => { setStartTime(value) }}
                                    required
                                    hideMobileKeyboard={true}
                                    closable={true}
                                />
                            </Form.Group>
                            <Form.Group>
                                <DateInput
                                    label='End Date'
                                    clearable
                                    name="endDate"
                                    placeholder="End Date"
                                    dateFormat="DD MMM YYYY"
                                    value={endDate}
                                    iconPosition="left"
                                    onChange={(e, { value }) => { setEndDate(value) }}
                                    required
                                    hideMobileKeyboard={true}
                                    closable={true}
                                />
                                <TimeInput
                                    label='End Time'
                                    clearable
                                    name="endTime"
                                    placeholder="End Time"
                                    timeFormat="AMPM"
                                    value={endTime}
                                    iconPosition="left"
                                    onChange={(e, { value }) => { setEndTime(value) }}
                                    required
                                    hideMobileKeyboard={true}
                                    closable={true}
                                />
                            </Form.Group>
                            <Divider />
                            <Header>
                                <Icon name='info circle' color='grey' />
                                <Header.Content>Event Details</Header.Content>
                                <Header.Subheader>Throw more light by briefly telling your invitees what to expect as they choose to attend your event.</Header.Subheader>
                            </Header>
                            <Form.Field required>
                                <Form.TextArea
                                    rows="8"
                                    name="eventDetails"
                                    value={value.eventDetails}
                                    onChange={onChange}
                                    data-testid="Description"
                                    required
                                />
                            </Form.Field>
                            <Form.Field required>
                                <label>Choose the Main Image for your event</label>
                                <Button
                                    secondary
                                    type='button'
                                    content='Select image'
                                    icon='camera'
                                    labelPosition='left'
                                    onClick={() => fileInputRef.current.click()}
                                />
                                <input
                                    ref={fileInputRef}
                                    type='file'
                                    hidden
                                    onChange={handleImageChange}
                                />
                            </Form.Field>
                            <Image
                                src={prevUrl}
                                centered
                                alt="event_image_preview"
                                size='large' rounded
                            />
                            <Divider />
                            <Header>
                                <Icon name='user' color='grey' />
                                <Header.Content>Organizer Information</Header.Content>
                                <Header.Subheader>Let your potential event-goers know how to contact you for more information or personal requests about your event.</Header.Subheader>
                            </Header>
                            <Form.Group>
                                <Form.Field width={7} required>
                                    <label>Organizer Email Address</label>
                                    <Input
                                        placeholder='Email'
                                        name='eventEmail'
                                        required
                                        value={value.eventEmail}
                                        onChange={onChange}
                                    />
                                </Form.Field>
                                <Form.Field width={7} required>
                                    <label>Organizer Phone Number</label>
                                    <Input
                                        label={
                                            <Dropdown
                                                inline
                                                search
                                                options={extensions}
                                                value={phoneExt}
                                                onChange={(e, { value }) => { setExt(value) }}
                                            />}
                                        labelPosition='left'
                                        name='eventPhone'
                                        value={value.eventPhone}
                                        onChange={onChange}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Divider />
                            <Form.Field>
                                <Popup
                                    content="If checked, a default number of 100 tickets will be sold for the event"
                                    trigger={<label>Tickets ?</label>}
                                />
                                <Checkbox
                                    toggle
                                    checked={tickets}
                                    onChange={() => { setTickets(!tickets) }}
                                />
                            </Form.Field>
                            <Divider />
                            <Form.Button type="submit" primary>Create Event</Form.Button>
                        </Form>
                    </Grid>
                </Segment>
            </Navbar>
        </>
    )
}