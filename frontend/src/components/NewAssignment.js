import { useNavigate, useParams } from "react-router-dom";
import {useState, useEffect} from "react";

import axios from "axios";
import Cookies from 'universal-cookie';


const NewAssignment = () => {
    const navigate = useNavigate();
    const params = useParams();
    const cookies = new Cookies();
    const userID = cookies.get("userID");
    const ID = params.id;

    useEffect(() => {
    console.log(`ID is ${ID}`)
    
    },[]
    )

    return (
        <div>
            

        </div>
    )
}

export default NewAssignment;