import Utility from './Utility';

class Authorization {
    static ROLE_CONFIG_MANAGER = 'CONFIG MANAGER';
    static ROLE_ADMIN = 'ADMIN';

    constructor(){
      this.authUser = null;
      this.authUserId = null;
      this.authRole = null;
    }
    /**
    * set auth user details to class property
    *
    * @return void
    */
    setAuthUser(){
      this.authUser = JSON.parse(localStorage.getItem("authorizedUserDetails"));
    }
    /**
    * check is active user is logged in
    *
    * @return boolean
    */
    isLoggedIn(){
      return typeof localStorage.getItem("authorizedUserDetails") === 'string'
    }
    /**
    * check user is having the expected role
    *
    * @param role
    * @return boolean
    */
    isUserRole(role){
      let user = this.getAuthUser();

      return (
        Utility.isObject(user) 
        && Utility.isObject(user.userRole)
        && user.userRole.name === role
      );
    }
    /**
    * check logged user is admin
    *
    * @return boolean
    */
    isAdmin(){
      return this.isUserRole(Authorization.ROLE_ADMIN);
    }        
    /**
    * check logged user is config manager
    *
    * @return boolean
    */
    isConfigManager(){
      return this.isUserRole(Authorization.ROLE_CONFIG_MANAGER);
    }        
    /**
    * get logged in user details
    *
    * @return boolean
    */
    getAuthUser(){
      if(this.isLoggedIn()){
        this.setAuthUser();
      }

      return this.authUser;
    };
    /**
    * get auth user identifier 
    *
    * @return int
    */
    getAuthUserId(){
      let user = this.getAuthUser();

      return (Utility.isObject(user) && user.id) ? user.id : 0;
    };    
    /**
    * Get authentication access token
    *
    * @return string
    */
    getAccessToken(){
      let accessToken = null;
      let authUser = this.getAuthUser();
      if(authUser && Utility.isString(authUser.token)){
        accessToken = authUser.token; 
      }
      
      return accessToken;
    };    
    /**
    * login the user by setting it in local storage
    *
    * @return boolean
    */
    login(userDetails){
      if (typeof(Storage) !== "undefined") {
          localStorage.removeItem("authorizedUserDetails");
          localStorage.setItem("authorizedUserDetails",JSON.stringify(userDetails));
      } else {
          console.error("local storage is not supported");
      }

      /*if(this.isLoggedIn()){
        window.location.href = 'home';
      }*/
    };
    /**
    * get logged in user details
    *
    * @return boolean
    */
    logout(){
      if (typeof(Storage) !== "undefined") {
          localStorage.removeItem("authorizedUserDetails");
          this.authUser = null;
      } else {
          console.error("local storage is not supported");
      }
    };           
}


export default new Authorization();