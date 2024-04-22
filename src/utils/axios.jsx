import axios from "axios";

const instance = axios.create({
    baseURL : "https://api.themoviedb.org/3/",
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjE0OGFlZTU1MWUxZDVmYTdhNmFhZjhlZWQ3YzIxZCIsInN1YiI6IjY1ZWVlNDkwZjVjYjIxMDE2MjQ1M2JmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q8L598u3FHAtRq4IWMvxTrI_lxrKZ04aHPdVVwHTF20'
    },
});

export default instance;