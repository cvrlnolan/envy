import Head from 'next/head'
import {
    Segment,
    Grid,
    Form,
    Header,
    Icon,
    Input,
    Image,
    Button,
    Dropdown,
    Divider
} from 'semantic-ui-react'
import Navbar from '@/components/layout/navbar'
import { TimeInput } from 'semantic-ui-calendar-react'
import { useState, createRef } from 'react'
import Compressor from 'compressorjs';

import { categories } from 'assets/venueCategories'
import { specialities } from 'assets/venueSpecialities'
import { days } from 'assets/weekDays'
import { countryOptions } from 'assets/countries'
import { extensions } from 'assets/phoneExtensions'

export default function CreateVenue() {

    const [value, setValue] = useState({
        venueName: '',
        venueStreet: '',
        venueProvince: '',
        venueCity: '',
        venueDetails: '',
        venuePhone: '',
        venueEmail: ''
    })

    const [venueCategory, setCategory] = useState()
    const [venueSpecialty, setSpecialty] = useState([])
    const [venueCountry, setCountry] = useState()
    const [phoneExt, setExt] = useState()
    const [openingDays, setOpeningDays] = useState([])
    const [exceptionalDays, setExceptionalDays] = useState([])

    const [openingTime, setOpeningTime] = useState('')
    const [closingTime, setClosingTime] = useState('')
    const [excepOpenTime, setExcepOpenTime] = useState('')
    const [excepClosingTime, setExcepClosingTime] = useState('')

    const [image, setImage] = useState()
    const [prevUrl, setPrevUrl] = useState()

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

    const onRegister = async () => {
        console.log({ ...value }, venueCategory, venueSpecialty, venueCountry, `${phoneExt} ${value.venuePhone}`, openingDays, exceptionalDays, openingTime, closingTime, excepOpenTime, excepClosingTime)
    }

    return (
        <>
            <Head>
                <title>Create Venue | Envy</title>
            </Head>
            <Navbar>
                <Segment raised padded>
                    <Grid container centered stackable padded>
                        <Form onSubmit={onRegister}>
                            <Header>
                                <Icon name='clipboard' color='grey' />
                                <Header.Content>Venue Identification</Header.Content>
                                <Header.Subheader>Identify your venue &amp; set its category to ease its access by potential customers.</Header.Subheader>
                            </Header>
                            <Form.Field required>
                                <label>Venue Name</label>
                                <input placeholder='Name' name='venueName' required value={value.venueName} onChange={onChange} />
                            </Form.Field>
                            <Form.Group>
                                <Form.Dropdown selection label='Venue Category' placeholder='Category' required options={categories} value={venueCategory} onChange={(e, { value }) => { setCategory(value) }} />
                                <Form.Dropdown selection multiple label='Venue Specialities' placeholder='Specialities' required options={specialities} value={venueSpecialty} onChange={(e, { value }) => { setSpecialty(value) }} />
                            </Form.Group>
                            <Divider />
                            <Header>
                                <Icon name='map marker alternate' color='grey' />
                                <Header.Content>Venue Location</Header.Content>
                                <Header.Subheader>Fill in precise information about the location of your venue in order to help users find you.</Header.Subheader>
                            </Header>
                            <Form.Input label='Street Address' placeholder='Address' required name='venueStreet' value={value.venueStreet} onChange={onChange} />
                            <Form.Group>
                                <Form.Input label='City' placeholder='City' required name='venueCity' value={value.venueCity} onChange={onChange} />
                                <Form.Input label='State/Province' placeholder='State/Province' required name='venueProvince' value={value.venueProvince} onChange={onChange} />
                            </Form.Group>
                            <Form.Select label='Country' placeholder='Country' required width={6} name='venueCountry' options={countryOptions} value={venueCountry} onChange={(e, { value }) => { setCountry(value) }} />
                            <Divider />
                            <Header>
                                <Icon name='info circle' color='grey' />
                                <Header.Content>Venue Details</Header.Content>
                                <Header.Subheader>Give some highlighted descriptions about your venue so the customers can picture what kind of atmosphere awaits them</Header.Subheader>
                            </Header>
                            <Form.Field required>
                                <Form.TextArea label='Description' row="8" name="venueDetails" value={value.venueDetails} onChange={onChange} />
                            </Form.Field>
                            <Form.Field required>
                                <label>Choose the Main Image for your venue</label>
                                <Button secondary type='button' content='Select image' icon='camera' labelPosition='left' onClick={() => fileInputRef.current.click()} />
                                <input ref={fileInputRef} type='file' hidden />
                            </Form.Field>
                            <Image src={prevUrl} centered alt="venue_image_preview" size='large' rounded />
                            <Divider hidden />
                            <Form.Group>
                                <Form.Dropdown selection multiple label='Opening Days' placeholder='Days' required name='openDays' options={days} value={openingDays} onChange={(e, { value }) => { setOpeningDays(value) }} />
                                <TimeInput
                                    label='Opening Time'
                                    name='openingTime'
                                    placeholder="From"
                                    timeFormat="AMPM"
                                    required
                                    hideMobileKeyboard={true}
                                    closable={true}
                                    iconPosition="left"
                                    value={openingTime}
                                    onChange={(e, { value }) => { setOpeningTime(value) }}
                                />
                                <TimeInput
                                    label='Closing Time'
                                    name='closingTime'
                                    placeholder="To"
                                    timeFormat="AMPM"
                                    required
                                    hideMobileKeyboard={true}
                                    closable={true}
                                    iconPosition="left"
                                    value={closingTime}
                                    onChange={(e, { value }) => { setClosingTime(value) }}
                                />
                            </Form.Group>
                            <Header>
                                <Header.Content>Exceptions</Header.Content>
                                <Header.Subheader>Do you have days with different opening/closing hours</Header.Subheader>
                            </Header>
                            <Form.Group>
                                <Form.Dropdown selection multiple label='Exceptional Opening Days' placeholder='Days' name='expDays' options={days} value={exceptionalDays} onChange={(e, { value }) => { setExceptionalDays(value) }} />
                                <TimeInput
                                    label='Opening Time'
                                    name='expOpeningTime'
                                    placeholder="From"
                                    timeFormat="AMPM"
                                    hideMobileKeyboard={true}
                                    closable={true}
                                    iconPosition="left"
                                    value={excepOpenTime}
                                    onChange={(e, { value }) => { setExcepOpenTime(value) }}
                                />
                                <TimeInput
                                    label='Closing Time'
                                    name='expClosingTime'
                                    placeholder="To"
                                    timeFormat="AMPM"
                                    hideMobileKeyboard={true}
                                    closable={true}
                                    iconPosition="left"
                                    value={excepClosingTime}
                                    onChange={(e, { value }) => { setExcepClosingTime(value) }}
                                />
                            </Form.Group>
                            <Divider />
                            <Header>
                                <Icon name='phone' color='grey' />
                                <Header.Content>Contact Information</Header.Content>
                                <Header.Subheader>Set your {"venue's"} contact details so as to have a direct link with customers.</Header.Subheader>
                            </Header>
                            <Form.Group>
                                <Form.Field width={7} required>
                                    <label>Venue Email Address</label>
                                    <Input placeholder='Email' name='venueEmail' required value={value.venueEmail} onChange={onChange} />
                                </Form.Field>
                                <Form.Field width={7} required>
                                    <label>Venue Phone Number</label>
                                    <Input label={<Dropdown inline search options={extensions} value={phoneExt} onChange={(e, { value }) => { setExt(value) }} />} labelPosition='left' name='venuePhone' value={value.venuePhone} onChange={onChange} />
                                </Form.Field>
                            </Form.Group>
                            <Divider />
                            <Form.Button type="submit" primary>Register Venue</Form.Button>
                        </Form>
                    </Grid>
                </Segment>
            </Navbar>
        </>
    )
}