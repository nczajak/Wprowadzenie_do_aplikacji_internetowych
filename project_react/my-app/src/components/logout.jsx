const Logout = ({logout,user})=>{

    return(
        <div className="avatarLogout">
            <button className="logoutButt" onClick={logout}>Log out</button>
            <div className="avatar">
                <p>{user.username}</p>
            </div>

        </div>
    )
}
export default Logout;