import { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";


const SearchBox = ({ history }) => {
   const [keyword, setKeyword] = useState("");

   const submitHandler = e => {
      e.preventDefault();
      if (keyword.trim()) {
         history.push(`/search/${keyword}`);
      } else {
         history.push("/");
      }
   }

   return (

      <Form onSubmit={submitHandler} className="input-group input-group-sm w-auto my-1">
         

         <FormControl
            type="text"
            name="q"
            onChange={e => setKeyword(e.target.value)}
            placeholder="Search Products..."
            className="xb"
         ></FormControl>

         <Button id="search-button" type="submit" variant="outline-warning" className="xb">Search</Button>

{/*   <div class="input-group mb-3">
         <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"></input>
         <button class="btn btn-outline-light" type="button" id="button-addon2">Button</button>
      </div> */}

      </Form>
   );
};

export default SearchBox;
