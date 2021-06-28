import React from "react";
import { firestore } from "../config/firebase";

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    firestore
      .collection("news")
      .get()
      .then((docs) => {
        var tempArr = [];
        docs.forEach((doc) => {
          tempArr.push({
            title: doc.data().title,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
          });
        });
        this.setState({ posts: tempArr });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div id="news">
        <h2 id="news-text">NMP News</h2>
        {this.state.posts.map((e) => {
          return (
            <div className="post" key={e.title}>
              <h5><i className="fas fa-newspaper"></i>{e.title}</h5>
              <div className="time">
                {e.timestamp.toDate().toString()}
              </div>
              <p>{e.text}</p>
              
            </div>
          );
        })}
      </div>
    );
  }
}

export default News;
