import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class LyricsList extends Component {
   likeLyric(id, likes) {
      this.props.mutate({
         variables: { id },
         optimisticResponse: {
            __typename: 'Mutation',
            likeLyric: {
               id,
               __typename: 'LyricType',
               likes: likes + 1
            }
         }
      })
   }
   render() {
      return (
         <ul className="collection">
            {
               this.props.lyrics && this.props.lyrics.map((item, key) => (
                  <li key={key} className="collection-item">
                     {item.content}
                     <div className="vote-box">
                        <i className="material-icons" onClick={() => this.likeLyric(item.id)}>thumb_up</i>
                        {item.likes}
                     </div>
                  </li>
               ))
            }
         </ul>
      )
   }
}

const mutation = gql`
   mutation likeLyric($id:ID) {
      likeLyric(id:$id) {
         id
         likes
      }
   }
`

export default graphql(mutation)(LyricsList);