'use client'
import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../firebase';
import { Search as SearchIcon} from 'lucide-react';

interface RSVPProps {
  windowWidth? : number;
  setSearch : React.Dispatch<React.SetStateAction<boolean>>;
  setForm : React.Dispatch<React.SetStateAction<boolean>>;
  setFirstName : React.Dispatch<React.SetStateAction<string>>;
  setLastName : React.Dispatch<React.SetStateAction<string>>;
  setId : React.Dispatch<React.SetStateAction<string>>;
}

interface RSVPDocument {
  id: string;
  firstName: string;
  lastName: string;
  attending: boolean;
  submitted: boolean;
}

const Search: React.FC<RSVPProps> = ({ setSearch, setForm, setFirstName, setLastName, setId }) => {
  const [searchFirstName, setSearchFirstName] = useState<string>('');
  const [searchLastName, setSearchLastName] = useState<string>('');
  const [rsvpList, setRsvpList] = useState<RSVPDocument[]>([]); 
  const [filtered, setFilter] = useState<RSVPDocument[]>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(true);
  const [enableSelect, setEnableSelect] = useState<boolean>(false);

  // Use the query in useCollection (it will run the query every time it changes)
  const [value, loading, error] = useCollection(collection(db, 'rsvp'));

  useEffect(() => {
    if (value) {
      // Map the documents and set the rsvpList state
      const fetchedRsvpList: RSVPDocument[] = value.docs.map(doc => ({
         // Extract the document ID
        ...doc.data() as RSVPDocument, // Type assertion to RSVPDocument
        id: doc.id,
      }));
      // Update the state
      setRsvpList(fetchedRsvpList);
    }
  }, [value]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();  // Prevent form submission if this is in a form
    console.log("Form submitted");
  };

  const handleFirst = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFirstName(event.target.value);
  };

  const handleLast = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLastName(event.target.value);
  };

  // Logging the snapshot or the results

  // Render the form

  useEffect(() => {
    console.log(rsvpList)
    //setFilter(rsvpList);
  }, [rsvpList])

  useEffect(() => {
    if (filtered.length == 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [filtered])

  useEffect(() => {
    if(searchFirstName.length > 0 || searchLastName.length > 0) {
      const filteredList = rsvpList.filter(rsvp =>
        rsvp.firstName.toLowerCase().includes(searchFirstName.toLowerCase()) &&
        rsvp.lastName.toLowerCase().includes(searchLastName.toLowerCase())
      );
      setSearching(true);
      setFilter(filteredList);
      console.log(filteredList);
    } else {
      setFilter([]);
      setSearching(false);
    }
  }, [searchFirstName, searchLastName]);

  useEffect(() => {
    console.log("selected option: " + enableSelect)
  },[enableSelect])

  const handleSelect = (id:string, firstName:string, lastName:string) => {
    console.log("selected person: " + id + ", " + firstName + " " + lastName)
    setId(id);
    setFirstName(firstName);
    setLastName(lastName);
    setEnableSelect(true);
  }

  const handleClickSelect = () => {
    console.log("selected");
    setSearch(false);
    setForm(true);
  }

  const searchForm = (
    <form onSubmit={handleSearch} className='w-11/12 sm:w-9/12 font-canto flex flex-col mb-5'>
      <div className='flex justify-between flex-col gap-4 sm:flex-row'>
        <div className='flex flex-col'>
          <label htmlFor="firstName" className='text-2xl font-bold'>First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className='text-xl rounded-md focus:outline-none border-[#cccccc] border px-3 py-1 caret-black'
            value={searchFirstName}
            onChange={handleFirst}
            required
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="lastName" className='text-2xl font-bold'>Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className='text-xl rounded-md focus:outline-none border-[#cccccc] border px-3 py-1 caret-black'
            value={searchLastName}
            onChange={handleLast}
            required
          />
        </div>
      </div>
    </form>
  );

  const noResults = (
    <div>
      <p>No results found.</p>
      <SearchIcon size={100}/>
    </div>
  );

  return (
    <div className="relative w-full text-black"> 
      <section className="h-auto relative flex flex-col items-center">
        {searchForm}
      </section>
      <div className='flex flex-col items-center'>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading...</span>}
        {searching && (
          <div className='w-11/12'>
            <ul className='flex flex-col'>
              {filtered.map((doc) => (
                <li className='my-2 border-2 rounded-lg p-3 font-canto text-lg' key={doc.id}>
                  <div className='flex gap-2'>
                    <input 
                      type="radio" 
                      id={doc.id} 
                      name="selectedUser" 
                      onChange={() => handleSelect(doc.id, doc.firstName, doc.lastName)} 
                      value={doc.id}
                      disabled={doc.submitted}
                    />
                    <label htmlFor={doc.id} className='text-2xl font-bold'>{doc.firstName + " " + doc.lastName}</label>
                  </div>
                  <div>{doc.submitted ? "confirmed" : "not confirmed"}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {empty && noResults}
        {enableSelect ? 
          <button className='py-2 w-11/12 bg-black text-white font-canto text-3xl rounded-lg mt-10 cursor-pointer' onClick={handleClickSelect}>Select</button> 
          : 
          <button className='py-2 w-11/12 bg-black text-white font-canto text-3xl rounded-lg mt-10 text-[#757575] bg-[#e0e0e0]'>Select</button> 
        }
      </div>
    </div>
  );
}

export default Search;