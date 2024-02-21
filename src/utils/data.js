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
];

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};
