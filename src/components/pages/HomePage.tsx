import PostForm from '../PostForm'
import PublicPosts from '../PublicPosts'

const HomePage = () => {
  return (
    <section>
      <div className='text-center my-4'>
        <h1 className='text-3xl font-bold'>Welcome to PostApp</h1>
        <p>Write your post & view and react other's posts</p>
      </div>
      <PostForm />
      <PublicPosts />
    </section>
  )
}

export default HomePage
