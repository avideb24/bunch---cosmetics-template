"use client";

import { CiSearch } from "react-icons/ci";
import React, { useState } from 'react';
import { Drawer } from 'antd';


const SearchBar = () => {

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    return (
        <div className=''>
            <button onClick={showDrawer}>
                <CiSearch className="text-2xl" />
            </button>
            <>
                <Drawer title="Search Here..." onClose={onClose} open={open}>
                    <div>
                        <input type="text" className="input !w-full" placeholder="Ex. Lipstic" />
                    </div>
                </Drawer>
            </>

        </div>
    );
};

export default SearchBar;