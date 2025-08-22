const CardStudentPass = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center gap-4 hover:shadow-xl transition">
      {/* Avatar */}
      <div className="rounded-full w-20 h-20 bg-blue-500 flex items-center justify-center text-white text-3xl font-semibold shadow-md">
        J
      </div>

      {/* Name + Subtitle */}
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-800">
          John Carlo Abanes
        </p>
        <p className="text-sm text-gray-500">EMP1234</p> 
      </div>

      <button
        className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
        onClick={() => console.log("Hello Admin")}
      >
        Change Password
      </button>
    </div>
  )
}

export default CardStudentPass
