
import Link from 'next/link';
import styles from '@/styles/page.css';

const NotFoundPage = () => {
  return (
    <div className="container3">
      <h1 className="title">404 - Page Not Found</h1>
      <p className="description">
        The page you are looking for does not exist.
      </p>
      <Link href="/Home">
       <p className='link'>Go back to the homepage</p>
      </Link>
    </div>
  );
};

export default NotFoundPage;