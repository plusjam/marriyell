import React, { useEffect } from "react";
import Styles from "../../styles/orgs/InstagramSection.module.scss";
import Link from "next/link";
import Image from "next/image";

type instagram = {
  caption: string;
  comments_count: number;
  id: string;
  like_count: number;
  media_type: string;
  media_url: string;
  permalink: string;
  timestamp: string;
};

const InstagramSection = () => {
  const [isloading, setIsLoading] = React.useState(true);
  const [posts, setPosts] = React.useState<instagram[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/instagram");
        const data = await response.json();
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("エラー", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className={Styles.section}>
      <div className={Styles.head}>
        <div className={Styles.headText}>Instagram</div>
        <div className={Styles.haedIcon}>
          <Image src="/images/icon_instagram.svg" alt="Instagram" width={41} height={41} />
        </div>
      </div>
      <div className={Styles.container}>
        {isloading ? (
          "読み込み中"
        ) : posts.length > 0 ? (
          <>
            {posts.map((post: any, index) => (
              <div className={Styles.post} key={`instagrampost${index}`}>
                <Link href={post.permalink} target="_blank">
                  {post.media_type === "VIDEO" ? <img src={post.thumbnail_url} alt="" width={189} height={189} /> : <img src={post.media_url} alt="" width={189} height={189} />}
                </Link>
              </div>
            ))}
          </>
        ) : (
          "調整中"
        )}
      </div>
    </section>
  );
};

export default InstagramSection;
