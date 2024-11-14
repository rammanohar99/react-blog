import Header from './components/Header';
import BlogList from './components/BlogList/BlogList';
import { posts } from './data/posts';
import PostEditor from './components/PostEditor/PostEditor'; // Import PostEditor
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <BlogList posts={posts} />
        {/* Render the PostEditor component */}
        <PostEditor />
      </main>
    </div>
  );
}

export default App;