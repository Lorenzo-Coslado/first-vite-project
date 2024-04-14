import { useState } from "react";
import { Tweet } from "./Tweet";

const DEFAULT_TWEETS = [
  { id: 0, name: "Lorenzo", content: "il fait beau", like: 1000 },
  { id: 1, name: "Melvyn", content: "il fait moche", like: 10 },
  { id: 2, name: "Johanna", content: "il fait pas beau", like: 100 },
  { id: 3, name: "Alexis", content: "il fait tres beau", like: 1 },
];

function App() {
  const [tweets, setTweets] = useState(DEFAULT_TWEETS);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const content = e.target.content.value;

    const newTweet = {
      id: tweets[tweets.length - 1]?.id + 1 ?? 0,
      name,
      content,
      like: 0,
    };

    setTweets([...tweets, newTweet]);

    
  };

  const onDelete = (tweetId) => {
    setTweets((curr) => curr.filter((tweet) => tweet.id !== tweetId));
  };

  const onLike = (tweetId) => {
    setTweets((curr) => {
      const copyTweet = [...curr];

      const likedTweet = copyTweet.find((tweet) => tweet.id === tweetId);
      likedTweet.like++;

      return copyTweet;
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="tweet-form">
        <h3>New Tweet</h3>
        <input type="text" name="name" placeholder="Nom" />
        <input type="content" name="content" placeholder="Tweet" />
        <input type="submit" />
      </form>
      <div className="tweet-container">
        {tweets.map((tweet) => {
          return (
            <Tweet
              key={tweet.id}
              id={tweet.id}
              name={tweet.name}
              content={tweet.content}
              like={tweet.like}
              onDelete={(id) => {
                onDelete(id);
              }}
              onLike={(id) => {
                onLike(id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
