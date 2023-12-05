/* Kerry O'Connor
* 11/27/23 (start date), due 12/11/23
* final project INF651
*/
function createElemWithText(stringName = 'p', textOfElem ='', classNameifNeeded) {
  let elemCreated = document.createElement(stringName);
 elemCreated.textContent = textOfElem;
  if (classNameifNeeded) {
    elemCreated.className = classNameifNeeded;
  }
  return elemCreated;
}
function createSelectOptions(usersData){
  if(!usersData){
    return undefined;
  }
  let optionsArray=[];
  for(let user of usersData){
    let option=document.createElement('option');
    option.value=user.id;
    option.textContent=user.name;
    optionsArray.push(option);
  }
  return optionsArray;
}
function toggleCommentSection(postId){
  if(postId===undefined){
    return undefined;
  }
  let selectedSection = document.querySelector(`section[data-post-id="${postId}"]`);
  if(selectedSection){
  selectedSection.classList.toggle('hide');
  }else{
    return null;
  }
  return selectedSection;
}
function toggleCommentButton(postId) {
  if (postId === undefined) {
    return undefined;
  }
  // Select the button element with the data-post-id attribute equal to postId
  const selectedButton = document.querySelector(`button[data-post-id="${postId}"]`);

  // Check if selectedButton is truthy 
  if (selectedButton) {
    // Toggle the 'hide' class on the button element
    selectedButton.classList.toggle('hide');

    // Switch textContent based on the current value using a ternary statement
    selectedButton.textContent = (selectedButton.textContent === 'Show Comments') ? 'Hide Comments' : 'Show Comments';
  } else {
    console.log('Button not found');
  }

  // Return the selectedButton or null if not found
  return selectedButton;
}
function deleteChildElements(parentElement){
  if (!(parentElement instanceof HTMLElement)) {
    return undefined;
  }
  let child=parentElement.lastElementChild; //Define a child variable as parentElement.lastElementChild
  while(child){ //While the child exists...(use a while loop)
  parentElement.removeChild(child); // Use parentElement.removeChild to remove the child in the loop
  child=parentElement.lastElementChild;
}
return parentElement;
}
function addButtonListeners() {
  const mainElement = document.querySelector('main');
  
  const buttonsInsideMain = mainElement ? mainElement.querySelectorAll('button') : [];

  if (buttonsInsideMain.length > 0) {
    buttonsInsideMain.forEach(button => {
      const postId = button.dataset.postId;
      if (postId !== undefined) {
        button.addEventListener('click', function(event) {
          toggleComments(event, postId);
        });
      } else {
        console.log('Button has no postId data attribute.');
      }
    });

    return buttonsInsideMain;
  } else {
    console.log('No buttons found inside the main element.');
    return [];
  }
}
function removeButtonListeners() {
  const mainElement = document.querySelector('main'); 
  const buttonsInsideMain = mainElement ? mainElement.querySelectorAll('button') : [];

  if (buttonsInsideMain.length > 0) {
    buttonsInsideMain.forEach(button => {
      const postId = button.dataset.id;

      // Ensure that postId exists before attempting to remove the listener
      if (postId !== undefined) {
        // Remove the click event listener from the button
        button.removeEventListener('click', buttonClickHandler);
      } else {
        console.log('Button has no postId data attribute.');
      }
    });

    return buttonsInsideMain;
  } else {
    console.log('No buttons found inside the main element.');
    return [];
  }
}

// Define a separate click event handler function
function buttonClickHandler(event) {
  const postId = event.currentTarget.dataset.postId; 
  toggleComments(event, postId);
}

function createComments(comments) {
    //depends on createElemWithText
  if (!comments) {
    console.log('Comment data is missing.');
    return undefined;
  }
  else{

  // Create a doc fragment
  let fragElement = document.createDocumentFragment();

  // Loop through the comments
  for (let i = 0; i < comments.length; i++) {
    // Get current comment in the loop
    let comment = comments[i];
    
    let articleElem = document.createElement('article');

    let h3 = createElemWithText('h3', comment.name);

    let para1 = createElemWithText('p', comment.body);

    let para2 = createElemWithText('p', `From: ${comment.email}`);

    // Append the h3 and paragraphs to the article element
    articleElem.append(h3, para1, para2);

    // Append the article element to the document fragment
    fragElement.append(articleElem);
  }

  // Return the document fragment containing all the articles
  return fragElement;
  }
}
function populateSelectMenu(usersData){
    //depends on createSelectOptions
  if(!usersData){
    return undefined;
  }else{
    
  
  let selectMenu=document.querySelector('#selectMenu');
  let options=createSelectOptions(usersData); //passes user data to createSelectOptions
  for(let i=0;i<options.length; i++){ //loop thru option elems and appends to select menu 
    let option=options[i];
    selectMenu.append(option);
  }
  return selectMenu;
  }
}
async function getUsers(){
  try{ //utilizes try catch
    const response= await fetch('https://jsonplaceholder.typicode.com/users');
    if(!response.ok){
      throw new Error(`Failed to fetch users. Status: ${response.status}`);
    }
    const usersData= await response.json(); //await users data response 
    return usersData;//return json data
  }catch(error){
    console.error('An error occurred:', error.message);
    throw error;
  }
}
async function getUserPosts(userId){
  if (userId === undefined) {
    console.error('No user ID provided.');
    return undefined;
  }
  try{
    const response= await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`); //access thru userId
    if(!response.ok){
      throw new Error(`Failed to fetch users posts. Status: ${response.status}`);
    }
    const userPosts= await response.json();
    return userPosts;
  }catch(error){
    console.error('An error occurred:', error.message);
    throw error;
  }
}
async function getUser(userId){
  if (userId === undefined) {
    console.error('No user ID provided.');
    return undefined;
  }
  try{
    const response=await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if(!response.ok){
      throw new Error(`Failed to fetch user data. Status: ${response.status}`);
    }
    const userData=await response.json();
    return userData;
  }catch(error){
    console.error('An error occurred: ', error.message);
    throw error;
  }
}
async function getPostComments(postId){
  if (postId === undefined) {
    console.error('No post ID provided.');
    return undefined;
  }
  try{
  const response=await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    if(!response.ok){
      throw new Error(`Failed to fetch post comment data. Status: ${response.status}`);
    }
    const postComments=await response.json();
    return postComments;
  }catch(error){
    console.error('An error occurred: ', error.message);
    throw error;
  }
}
async function displayComments(postId) {
  // Check if postId is not provided
  if (postId === undefined) {
    console.error('No post ID provided.');
    return undefined;
  }

  // Create a section element
  let section = document.createElement('section');

  // Set attributes on the section element
  section.dataset.postId = postId;
  section.classList.add('comments', 'hide');

  try {
    let comments = await getPostComments(postId);
    let fragment = createComments(comments);
    section.appendChild(fragment);
    return section;
  } catch (error) {
    console.error('An error occurred:', error.message);
    throw error;
  }
}
async function createPosts(postData) {
  if (!postData) {
    return undefined;
  } else {
    let fragment = document.createDocumentFragment();
    for (const post of postData) {
      let article = document.createElement('article');
      let h2 = createElemWithText('h2', post.title);
      let bodyPara = createElemWithText('p', post.body);
      let postIdPara = createElemWithText('p', `Post ID: ${post.id}`);
      let author = await getUser(post.userId);
      let authorBio = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
      let catchPhrase = createElemWithText('p', author.company.catchPhrase);

      // Create a button with the text 'Show Comments'
      let showCommentButton = createElemWithText('button', 'Show Comments');
      showCommentButton.dataset.postId = post.id;

      article.append(h2, bodyPara, postIdPara, authorBio, catchPhrase, showCommentButton);
      let section = await displayComments(post.id);
      article.append(section);

      fragment.append(article);
    }

    // Return the fragment element
    return fragment;
  }
}


async function displayPosts(postData) {
  let element=0;
  let mainElement=document.querySelector("main");
  if(postData){
    element= await createPosts(postData);
  }
  else if(!postData){
    element=createElemWithText("p","Select an Employee to display their posts.","default-text");
  }
  mainElement.append(element);
  return element;
}
function toggleComments(event, postId) { //function 17, was previously just a placeholder
  if(!event||!postId){ //return undefined if either event or postId not given 
    return undefined;
  }
  event.target.listener=true;
  let section=toggleCommentSection(postId);
  let button=toggleCommentButton(postId); 
  return [section,button]; //return an array containing section and button
}
async function refreshPosts(postData){
  //dependencies: removeButtonListeners, deleteChildElements, displayPosts, addButtonListeners
  if(!postData){
    return undefined;
  }
  let removeButtons=removeButtonListeners();
  let retMainElement=deleteChildElements(document.querySelector("main"));
  let fragment=await displayPosts(postData);
  let addButtons=addButtonListeners();
  let resultArray= [removeButtons, retMainElement, fragment, addButtons];
  return resultArray;
}
async function selectMenuChangeEventHandler(event) {
  // dependencies: getUserPosts, refreshPosts
  if (!event) {
    return undefined;
  }

  // Access the select menu element and disable it
  const selectMenu = document.querySelector('#selectMenu');
  selectMenu.disabled = true;

  let userId = event?.target?.value || 1; //did this exactly as outlined on cheatsheet
  let result = await getUserPosts(userId);
  let refreshPost = await refreshPosts(result);
  let resultingArray = [userId, result, refreshPost];

  // Re-enable the select menu after the asynchronous operations are completed
  selectMenu.disabled = false;

  return resultingArray;
}
async function initPage(){
  //dependencies: getUsers, populateSelectMenu
  let userData=await getUsers();
  let selectElem=populateSelectMenu(userData);
  let resultArray=[userData,selectElem];
  return resultArray;
}
function initApp(){
  //dependencies: initPage, selectMenuChangeEventHandler
  initPage();
  const selectMenu = document.querySelector('#selectMenu');
  selectMenu.addEventListener('change', selectMenuChangeEventHandler);
}
document.addEventListener('DOMContentLoaded',initApp); //must be included for it to work