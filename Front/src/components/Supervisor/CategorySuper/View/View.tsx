import { useEffect, useState } from 'react'
import axios from 'axios';



function View(props: { name: string, name_ar: string, file: React.ReactNode }) {
    console.log(props)

    return (
        <div className='user-view'>
            <h1>Basic Info</h1>
            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Category Name:</span>
                            <span>{props.userId.name}</span>
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Arabic Name:</span>
                            <span>{props.userId.name_ar}</span>
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>File:</span>
                            <span>{props.userId.file}</span>
                        </p>
                    </div>

                </div>
            </div>



        </div>
    )
}

export default View