import React, { Component } from "react";
import { Link } from "react-router";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import songQuery from "../queries/songs";

class SongList extends Component {

   deleteSong(id) {
      this.props.mutate({ variables: { id } })
         .then(() => this.props.data.refetch())
   }

   renderSongs() {
      return this.props.data.songs.map((item, key) => {
         return (
            <li key={key} className="collection-item">
               <Link to={`/songs/${item.id}`}>
                  {item.title}
               </Link>
               <i className="material-icons" onClick={() => this.deleteSong(item.id)}>delete</i>
            </li >
         )
      })
   }

   render() {
      if (this.props.data.loading) { return <div>Loading...</div> }
      return (
         <div>
            <ul className="collection">
               {this.renderSongs()}
            </ul>
            <Link to="/songs/new" className="btn-floating btn-large red right">
               <i className="material-icons">add</i>
            </Link>
         </div>
      )
   }
}

const mutation = gql`
   mutation DeleteSong($id:ID){
      deleteSong(id:$id) {
         id
      }
   }
`

export default graphql(mutation)(graphql(songQuery)(SongList));