import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../services/firebase';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
const ContactUs = () => (
  <>
    <Navbar isLoggedIn={false} />
  <div style={{ padding: "2rem" }}>
    <h2>Contact Us</h2>
    <p>Email us at: <strong>support@idoubt.com</strong></p>
    <p>Or fill out our form (Coming Soon!)</p>
  </div>
  </>
);

export default ContactUs;
