import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {
    KeyboardDatePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers';
import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Booking from '../Booking/Booking';

const Book = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date()
    });
    const { bedType } = useParams();

    const handleCheckInDate = (date) => {
        const newDate = { ...selectedDate }
        newDate.checkIn = date;
        setSelectedDate(newDate);
    };

    const handleCheckOutDate = (date) => {
        const newDate = { ...selectedDate }
        newDate.checkOut = date;
        setSelectedDate(newDate);
    };

    const handleBooking = () => {
        const newBooking = { ...loggedInUser, ...selectedDate };
        fetch('http://localhost:4000/addBooking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBooking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }


    return (
        <div style={{ textAlign: 'center' }}>
            <h1> Hello {loggedInUser.name}! Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Check In Date"
                        value={selectedDate.checkIn}
                        onChange={handleCheckInDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check Out Date"
                        format="MM/dd/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOutDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />

                </Grid>
                <Button onClick={handleBooking} variant="contained" color="primary">Book Now</Button>
            </MuiPickersUtilsProvider>
            <Booking></Booking>
        </div>
    );
};

export default Book;