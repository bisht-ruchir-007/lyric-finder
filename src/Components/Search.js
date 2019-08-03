import React,{Component} from 'react'
import axios from 'axios';
import {Consumer} from '../context';

class Search extends Component{
    state = {
        tractTitle: ''
    }
    findTrack = (dispatch,e)=>{
        e.preventDefault();

        axios
            .get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.tractTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res =>{
                dispatch({
                    type: 'SEARCH_TRACKS',
                    payload: res.data.message.body.track_list
                });

                this.setState({ trackTitle: ''});
            })
            .catch(err => console.error(err));


    }
    onChange = (e)=> {
        this.setState({ [e.target.name] : e.target.value });
    }
   render(){
       return(
           <Consumer>
               {value =>{
                   const { dispatch } = value;         
                   return (
                       <div className="form card card-body mb-4 p-10">
                          <h1 className="form-h1 display-4 text-center">SEARCH FOR A SONG</h1>
                          <p className="lead text-center">🇮🇹 Made with love & passion .</p>
                          <p className="lead text-center">🌎 Enjoyed everywhere</p>
                          <form onSubmit={this.findTrack.bind(this, dispatch)}>
                              <div className="form-group">
                                  <input type="text"
                                  className="form-control form-control-lg" 
                                  placeholder="Type Song Title" 
                                  name="tractTitle" 
                                  value={this.state.tractTitle}
                                  onChange={this.onChange}
                                  ></input>
                              </div>
                              <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">GET TRACK LYRICS</button>
                          </form>
                       </div>    
                   );
               }}
           </Consumer>
       )
   }
}

export default Search;