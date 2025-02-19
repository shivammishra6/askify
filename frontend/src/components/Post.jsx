import React from 'react'

const Post = () => {
  return (
    <div>
        <p>Shivam mishra</p>
        <p className="text-[20px] font-bold">
          What will be the day after tomorrow?
        </p>
        <div className="flex gap-3 mt-3">
          <button className="border px-2">
            👍<span>12</span>
          </button>
          <button className="border px-2">
            👎<span>34</span>
          </button>
        </div>
    </div>
  )
}

export default Post     