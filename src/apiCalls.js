const fetchData = (data) => {
  return fetch(`http://localhost:3001/api/v1/${data}`)
  .then(res => {
    if(!res.ok){
        throw new Error(res);
    }
    return res.json();
  })
    .catch(err => console.log(err));
};

export { fetchData };