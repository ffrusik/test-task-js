import { Button, Grid } from '@material-ui/core';
import { Box } from '@mui/system';
import React, { Component } from 'react';
// import { Formik } from 'formik';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        };
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
    }

    render() {
        const { error, isLoaded, items } = this.state;

        let links = [];
        for (let i = 0; i < items.length; i++) {
            links.push("https://picsum.photos/385/200?random=" + i);
        }

        function delPost(id) {
            document.getElementById(id).remove();
        }

        function editPost(title, body) {
            
        }

        if (error) {
            return <p>Error {error}</p>;
        } else if(!isLoaded) {
            return <p>Loading {error}</p>;
        } else {
            return (
                <Box sx={{ width: '1250px', margin: "2em auto 0" }}>
                    <Grid container>
                        {items.map(item => (
                            <Grid item xs="12" md="4" id={item.id}>
                                <div style={{width: '370px', margin: '0 11px 2em'}}>                           
                                    <img alt="pic" src={links.pop()} />
                                    <div className="title" id={"title" + item.id}>{item.title}</div>
                                    <div className="body" id={"body" + item.id}>{item.body}</div>
                                    <Button 
                                        onClick={() => { document.getElementById("form" + item.id).removeAttribute("hidden") }}
                                        color="primary"
                                        variant="outlined"
                                        startIcon={<EditIcon />}
                                        style={{marginTop: "10px", marginRight: "7px"}}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        onClick={() => { delPost(item.id); }} 
                                        color="secondary" 
                                        variant="outlined" 
                                        startIcon={<DeleteIcon />}
                                        style={{marginTop: "10px"}}
                                    >
                                        Delete
                                    </Button> 

                                    <form onsubmit="return false" id={"form" + item.id} method="POST" hidden>
                                        <textarea>{item.title}</textarea>
                                        <textarea>{item.body}</textarea>
                                        <Button 
                                            type="submit"
                                            startIcon={<DoneIcon />}>Edit</Button>
                                    </form>

                                    {window.onload = e => {
                                    const form = document.querySelector('#form-id')
                                    
                                    const formHandler = e => {
                                        e.preventDefault()
                                        const formData = new FormData( e.target )
                                        console.log(...formData)
                                    }
                                    
                                    form.addEventListener('submit', formHandler)
                                    }}
                                </div>
                            </Grid> 
                        ))}

                    </Grid>
                </Box>
            );
        }
    }
}