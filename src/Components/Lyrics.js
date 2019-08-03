import React ,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
import Moment from 'react-moment'

class Lyrics extends Component{
    state = {
        track: {},
        lyrics: {}
    }
    componentDidMount(){
        axios
        .get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res =>{
            //console.log(res.data);
            this.setState({lyrics: res.data.message.body.lyrics});

            return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
        })
        .then(res =>{
            //console.log(res.data);
            this.setState({track: res.data.message.body.track});
        })
        .catch(err => console.error(err));
    }
    render(){
        const { track, lyrics } = this.state;
        console.log(track);
        
        if (track === undefined || Object.keys(track).length === 0 || lyrics === undefined || Object.keys(lyrics).length === 0) {
            return <Spinner/>
        } else {
            return(
                <React.Fragment>
                             <Link to="/" className="back btn btn-dark">BACK</Link>
                    <div className="card">
                        <h5 className="card-header">
                        <strong><h1>TRACK : {track.track_name}</h1></strong>
                        <span><strong>ARTIST : {track.artist_name}</strong></span>
                        </h5>
                        <div className="card-body">
                            <h5>LYRICS:</h5>
                            <p className="card-text">{lyrics.lyrics_body}</p>
                        </div>
                    <ul className="list-group mt-3">
                        <li className="list-group-item">
                            <strong>ALBUM ID</strong> : {track.album_id}
                        </li>
                        <li className="list-group-item">
                            <strong>SONG GENRE</strong> : {track.primary_genres.music_genre_list[0] !== undefined ? track.primary_genres.music_genre_list[0].music_genre.music_genre_name:'N/A'}
                        </li>
                        <li className="list-group-item">
                            <strong>EXPLICIT WORDS</strong> : {track.explicit === 0 ? 'NO' : 'YES'}
                        </li>
                        <li className="list-group-item">
                            <strong>RATING</strong> : {track.track_rating} (Out of 100)
                        </li>
                        <li className="list-group-item">
                            <strong>UPDATE TIME</strong> : <Moment format="DD/MM/YYYY">{track.updated_time}</Moment>
                        </li>
                    </ul>
                    </div>
                    <br/>
                </React.Fragment>
            )
        }
    }
}

export default Lyrics;