import React from 'react';
import { Link, NavLink, Route } from 'react-router-dom'
import { updatePost, removePost, updateComment, removeComment, setFilter, commentsFetchData } from '../actions'
import * as dataAccessAPI from '../utils/dataAccessAPI.js'
import { getImg, getDate} from '../utils/helper.js'
import sortBy from 'sort-by'
import { connect } from 'react-redux'
import ListComments from './ListComments.js'


const PostDetails = (props) => {
	//let {category, number} = props.match.params
	const {posts, comments, categories, router, addPost, addComment, deleteComment, deletePost, setCategory} = props
	let path = router.location.pathname.slice(1)
  let havePostID = path.indexOf('/')
  if ( havePostID < 0){
    setCategory(path)
  }
  let id = path.slice(path.indexOf('/')+1)
  /*
	if (Object.keys(props.match.params).length === 0){
		category = ''
	}*/


	let postsList = [...Object.values(posts)].filter((c) => {
        return (c.deleted !== true && c.id == id )
      })

	console.log("I'm in POST DETAILS")
	return (
		<div className='post-details'>
      <em>There should be a post here!</em>
      {postsList.map((post, index) =>
        <div key={post.id}>
          <div className='post-item'>
            <div className='post-heading'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${getImg(post)})`
              }}/>
              <h3>{post.title}</h3>
              <p>{`Submitted on ${getDate(post.timestamp)}`}</p>
              <p className="post-author">{`by ${post.author}`}</p>
              <p className="post-author">{`Vote Score: ${post.voteScore}`}</p>
              <button className='contact-remove' onClick={()=> deletePost({postID:post.id})}>
                Remove
              </button>
            </div>
            <div className='post-body'>
              <p>{post.body}</p>
            </div>

          </div>
          <div className='post-comment-count'>
            <h4>{`${post.commentCount} comments`}</h4>
          </div>
          <ListComments postID={post.id} />
        </div>

      )}


		</div>
		)
}


function mapStateToProps ({ posts,
  comments, categories, viewFilter, router,
  commentsIsLoading, commentsHasErrored, items }) {

  return {
    posts: posts,
    comments: comments,
    categories: categories,
    viewFilter: viewFilter,
    router: router,
    items: items,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(updatePost(data)),
    deletePost: (data) => {
      dataAccessAPI.delPost(data.postID)
      return dispatch(removePost(data))
    },
    addComment: (data) => dispatch(updateComment(data)),
    deleteComment: (data) => dispatch(removeComment(data)),
    setCategory: (data) => dispatch(setFilter(data)),
    fetchComments: (url) => dispatch(commentsFetchData(url)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(PostDetails)

