import React, { Component } from "react";
import { Link } from "react-router";
import { graphql } from "react-apollo";
import songQuery from "../queries/song";
import LyricCreate from "./LyricCreate";
import LyricsList from "./LyricsList";

class SongDetail extends Component {
   render() {

      const { song } = this.props.data;

      if (!song) { return <div>Loading...</div> }

      return (
         <div>
            <Link to="/">Back</Link>
            <h3>{song.title}</h3>
            <LyricsList lyrics={song.lyrics}/>
            <LyricCreate songId={this.props.params.id}/>
         </div>
      )
   }
}

export default graphql(songQuery, {
   options: props => { return { variables: { id: props.params.id } } }
})(SongDetail);