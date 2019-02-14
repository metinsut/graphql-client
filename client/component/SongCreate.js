import React, { Component } from "react";
import { Link } from "react-router";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import songsQuery from "../queries/songs";
import { hashHistory } from "react-router";

class SongCreate extends Component {

   constructor(props) {
      super(props);
      this.state = {
         title: ""
      }

   }

   onSubmit(e) {
      e.preventDefault();
      this.props.mutate({
         variables: {
            title: this.state.title
         },
         refetchQueries: [{ query: songsQuery }]
      })
         .then(() => hashHistory.push("/"))
   }

   render() {
      return (
         <div>
            <Link to="/">Back</Link>
            <h3>Create Song</h3>
            <form onSubmit={(e) => this.onSubmit(e)}>
               <label>Song Title:</label>
               <input
                  type="text"
                  value={this.props.title}
                  onChange={e => this.setState({ title: e.target.value })}
               />
            </form>
         </div>
      )
   }
}

const mutation = gql`
   mutation AddSong($title:String){
      addSong(title:$title) {
         title
      }
   }
`

export default graphql(mutation)(SongCreate);