import jwt_decode from 'jwt-decode';

function setToken(token){
   localStorage.setItem('access_token', token);
}

export function getToken() {
   try{
      return localStorage.getItem('access_token');
   }catch(err){
      return null;
   }
}

export function removetoken() {
   localStorage.removeItem('access_token');
}
export function readToken(){
   try{
      const token= getToken();
      return token ? jwt_decode(token) : null;
   }catch (err){
      return null;
   }
}

export function isAuthenticated() {
   const token = readToken();
   return !!token;
}
export async function registerUser(user,password,password2){
   const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/register`, {
      method: 'POST',
      body: JSON.stringify({
         userName: user,
         password: password,
         password2: password2,
      }),
      headers: {
         'Content-type' : 'application/json'
      }
   });
   
   const data = await res.json();
   if (res.status === 200){
      return true
   } else{
      throw new Error(data.message);
   }
}

export async function authenticateUser(user, pass){
   const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/login`, {
      method: 'POST',
       body: JSON.stringify({
         userName: user, password: pass
      }),
      headers: {
         'Content-type' : 'application/json',
      },
   });

   const data = await res.json();

   if (res.status === 200 || res.status === 204){
      setToken(data.token);
      return true;
   } else{
      throw new Error(data.message);
   }
}