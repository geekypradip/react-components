import axios from "axios";
import { Children, useEffect, useRef, useState } from "react";
import { UserCard } from "./card";
import { Spinner } from "react-bootstrap";
interface Iusers {
  loading: boolean;
  data: any[];
}
const initialState: Iusers = {
  loading: false,
  data: [],
};

export const UsersContainer = () => {
  const [users, setUsers] = useState<Iusers>(initialState);
  const usersContainerRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const pageRef = useRef(0);
  /**function to fetch products */
  const fetchUsers = (page: number) => {
    setUsers((prev) => ({
      ...prev,
      loading: true,
    }));
    axios
      .get(
        `https://api.slingacademy.com/v1/sample-data/users?offset=${
          page * 10
        }&limit=10`
      )
      .then((res) =>
        setUsers((prev) => ({
          ...prev,
          data: [...prev?.data, ...res.data.users],
          loading: false,
        }))
      );
  };

  const handleInfiniteScroll = () => {
    const scrollHeight = usersContainerRef.current.scrollHeight,
      clientHeight = usersContainerRef.current.clientHeight,
      scrollTop = usersContainerRef.current.scrollTop;

    if (clientHeight + scrollTop + 100 > scrollHeight && !users.loading) {
      fetchUsers(pageRef.current + 1);
      pageRef.current += 1;
    }
  };

  useEffect(() => {
    fetchUsers(0);

    return () => setUsers(initialState);
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "700px",
          border: "1px solid #dfdcdc",
          overflow: "scroll",
          display: "flex",
          flexWrap: "wrap",
          gap: 15,
        }}
        ref={usersContainerRef}
        onScroll={handleInfiniteScroll}
      >
        {Children.toArray(users?.data?.map((user) => <UserCard {...user} />))}
      </div>
      <div style={{ textAlign: "center" }}>
        {users.loading && <Spinner animation="border" variant="primary" />}
      </div>
    </>
  );
};
