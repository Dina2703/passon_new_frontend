import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [comment, setComment] = useState("");
  const [pinDetail, setPinDetail] = useState(null);
  const [addingComment, setAddingComment] = useState(false);

  const { pinId } = useParams();

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      //get single pin
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);

        if (data[0]) {
          //get all related pins to that single pin, that we just got above
          query = pinDetailMorePinQuery(data[0]);

          client.fetch(query).then((data) => setPins(data));
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            key: uuidv4(),
            postedBy: {
              _type: "postedBy",
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment("");
          setAddingComment(false);
        });
    }
  };

  if (!pinDetail) return <Spinner message="Loading pin..." />;

  console.log(pinDetail);

  return (
    <>
      <div
        className="flex xl:flex-row flex-col m-auto bg-white"
        style={{ maxWidth: "1500px", borderRadius: "32px" }}
      >
        <div className="flex justify-center items-center md:items-start">
          <img
            src={pinDetail?.image && urlFor(pinDetail.image).url()}
            alt="user-post"
            className="rounded-t-3xl rounded-b-lg"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
                href={`${pinDetail?.image?.asset.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-9 h-9 rounded-full flex items-center justify-center"
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a href={pinDetail?.destination} target="_blank" rel="noreferrer">
              {pinDetail.destination}
            </a>
          </div>
          <div>
            <h1 className="text-4xl font-bold break-words mt-3">
              {pinDetail.title}
            </h1>
            <p className="mt-3">{pinDetail.about}</p>
          </div>

          <Link
            to={`/user-profile/${pinDetail?.postedBy?._id}`}
            // to={`user-profile/${postedBy?._id}`}
            className="flex gap-2 mt-5 items-center bg-white rounded-lg"
          >
            <img
              src={pinDetail?.postedBy?.image}
              alt="user-profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <p className="font-semibold capitalize">
              {pinDetail?.postedBy?.userName}
            </p>
          </Link>
          <h2 className="mt-5 text-2xl">Comments</h2>
          <div className="max-h-370 overflow-y-auto">
            {pinDetail.comments ? (
              pinDetail?.comments.map((comment, i) => (
                <div className="flex gap-2 mt-5 items-center bg-white" key={i}>
                  <img
                    src={comment.postedBy?.image}
                    alt="user-profile"
                    className="w-10 h-10 rounded-full cursor-pointer "
                  />
                  <div className="flex flex-col">
                    <p>{comment?.postedBy.userName}</p>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <i>No comments</i>
            )}
          </div>
          {/* create comment */}
          <div className="flex items-center flex-wrap mt-6 gap-3">
            <Link to={`user-profile/${pinDetail?.postedBy?._id}`}>
              <img
                src={pinDetail?.postedBy?.image}
                alt="user-profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </Link>
            <input
              type="text "
              className="flex-1 border-2 border-gray-100 outline-none bottom-2 rounded-2xl focus:border-gray-300 p-3"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="button"
              className="bg-red-500 text-white rounded-full px-6 py-3 font-semibold text-base"
              onClick={addComment}
            >
              {addingComment ? "Posting the comment" : "Post"}
            </button>
          </div>
        </div>
      </div>
      {console.log(pins)}
      {pins?.length > 0 ? (
        <>
          <h2 className="text-center font-bold text-2xl mt-8 mb-4">
            More like this
          </h2>
          <MasonryLayout pins={pins} />
        </>
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  );
};

export default PinDetail;
