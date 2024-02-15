export const userQuery = (userId) => {
  //it says: try to get me a document of type equal user and id equal the userId
  const query = `*[_type == "user" && _id == "${userId}"]`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type =="pin" && title match '${searchTerm}*'|| category match '${searchTerm}*' || about match  '${searchTerm}*']{
    image {
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    }, 
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const feedQuery = `*[_type == 'pin'] | order(_createAt desc) {
  image {
    asset -> {
      url
    }
  },
  _id,
  destination,
  postedBy -> {
    _id,
    userName,
    image
  }, 
  save[] {
    _key,
    postedBy -> {
      _id,
      userName,
      image
    },
  },
}`;

export const categories = [
  {
    name: "Nature",
    imageUrl: "https://source.unsplash.com/featured/?nature",
  },
  {
    name: "Animals",
    imageUrl: "https://source.unsplash.com/featured/?animals",
  },
  {
    name: "Food",
    imageUrl: "https://source.unsplash.com/featured/?food",
  },
  {
    name: "Travel",
    imageUrl: "https://source.unsplash.com/featured/?travel",
  },
  {
    name: "Architecture",
    imageUrl: "https://source.unsplash.com/featured/?architecture",
  },
  {
    name: "Art",
    imageUrl: "https://source.unsplash.com/featured/?art",
  },
  {
    name: "Technology",
    imageUrl: "https://source.unsplash.com/featured/?technology",
  },
  {
    name: "Fashion",
    imageUrl: "https://source.unsplash.com/featured/?fashion",
  },
  {
    name: "Sports",
    imageUrl: "https://source.unsplash.com/featured/?sports",
  },
  {
    name: "Music",
    imageUrl: "https://source.unsplash.com/featured/?music",
  },
  {
    name: "Cars",
    imageUrl: "https://source.unsplash.com/featured/?cars",
  },
  {
    name: "Movies",
    imageUrl: "https://source.unsplash.com/featured/?movies",
  },
  {
    name: "Books",
    imageUrl: "https://source.unsplash.com/featured/?books",
  },
  {
    name: "Fitness",
    imageUrl: "https://source.unsplash.com/featured/?fitness",
  },
  {
    name: "Education",
    imageUrl: "https://source.unsplash.com/featured/?education",
  },
];
