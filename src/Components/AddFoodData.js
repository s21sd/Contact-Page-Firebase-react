import React, { useState } from 'react'
import './AddFoodData.css'

// this is use to import firebase
import { db, storage } from '../Components/Firebase/Firebaseconfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { addDoc, collection } from "firebase/firestore"


const AddFoodData = () => {
    const [foodName, setfoodname] = useState('');
    const [foodDescription, setfooddescription] = useState('');
    const [foodPrice, setfoodprice] = useState('');
    const [foodImage, setfoodimge] = useState(null);
    const [foodCategory, setfoodcategory] = useState('');
    const [restaurentAddress, setrestaurentaddress] = useState('');
    const [foodPhone, setfoodphone] = useState('');

    const [foodImageUrl, setfoodimageUrl] = useState('');
    // console.log(foodimage);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (foodImage == null) {
            alert("Please Select an Image");
            return;
        }
        else {
            const imageRef = ref(storage, `FoodImages/${foodImage.name}`)
            uploadBytes(imageRef, foodImage)
                .then(() => {
                    // console.log("Image also successfully uploaded");
                    getDownloadURL(imageRef)
                        .then((url) => {
                            // console.log(url);
                            setfoodimageUrl(url);

                            // setting the all values here

                            const foodData = {
                                foodName,
                                foodDescription,
                                foodPrice,
                                foodImageUrl: url,
                                foodCategory,
                                restaurentAddress,
                                foodPhone
                            }
                            console.log(foodData);
                            try {
                                const docRef = addDoc(collection(db, "FoodData"), foodData);
                                // console.log("Data added succesfully in your firebase", docRef.id);
                            } catch (error) {
                                console.error("Error on addding the data ", error);

                            }

                        })
                })

        }

    }
    return (
        <div className='form-outer'>
            <h1>
                Add Food Data
            </h1>

            <form className='form-inner'>

                <label>Food Name
                    <input type='text' name='food_name' onChange={(e) => { setfoodname(e.target.value) }}></input>
                    <br />
                </label>

                <label>Food Description
                    <input type='text' name='food_description' onChange={(e) => { setfooddescription(e.target.value) }}></input>
                    <br />
                </label>

                <label>Food Price
                    <input type='number' name='food_price' onChange={(e) => { setfoodprice(e.target.value) }}></input>
                    <br />
                </label>

                <label>Food Image
                    <input type='file' name='food_image' onChange={(e) => { setfoodimge(e.target.files[0]) }}></input>
                    <br />
                </label>

                <label>Food Category
                    <input type='text' name='food_category' onChange={(e) => { setfoodcategory(e.target.value) }}></input>
                    <br />
                </label>
                <br />

                <label>Restaurant Address
                    <input type='text' name='restaurent_address' onChange={(e) => { setrestaurentaddress(e.target.value) }}></input>
                    <br />
                </label>
                <br />

                <label>Restaurant Phone
                    <input type='number' name='restaurent_number' onChange={(e) => { setfoodphone(e.target.value) }}></input>
                    <br />
                </label>
                <br />

                <button onClick={handleSubmit}>Add Food</button>
            </form>

        </div>
    )
}

export default AddFoodData
