import React, {useState, useEffect} from 'react';
import '../App';
import { API_URL } from '../API';
import axios from 'axios';
import { useAppContext } from './context/appContext';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks]= useState([]);

    const {favorites, addToFavorites, removeFromFavorites}= useAppContext();

    const navigate = useNavigate

    console.log("Favorites are", favorites);

    const favoritesChecker= (id)=>{
        const boolean = favorites.some((book)=> book.id === id);
        return  boolean 
    }

    useEffect (()=>{
        axios.get(API_URL).then(res=>{
            console.log(res.data)
            setBooks(res.data)
        }).catch(err=>console.log(err));
    }, []);

    return (
        <div className='bookList'>
            {books.map((book)=>(
                <div key={book.id} className='book'>
                    <div><h2>{book.title}</h2></div>
                    <div><img src={book.image_url} alt="#" onClick={()=>navigate(`/books/${book.id}`)}/>
                    </div>
                    {favoritesChecker(book.id) ? (
                        <div><button onClick={()=>removeFromFavorites(book.id)}>Remove from Favorites</button></div>
                    ) : (
                        <div><button onClick={()=>addToFavorites(book)}>Add to Favorites</button></div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default BookList;