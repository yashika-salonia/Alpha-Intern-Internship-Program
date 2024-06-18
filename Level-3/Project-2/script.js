// Add event listener to search button
document.querySelector('.search-bar button').addEventListener('click', function() {
    // Get search input value
    const searchInput = document.querySelector('.search-bar input[type="search"]').value;
    // Redirect to search results page
    window.location.href = `https://www.myntra.com/womens-western-wear?f=Brand%3ACHIC BY TOKYO TALKIES%2CKETCH%2CPink Paprika by SASSAFRAS%2CSASSAFRAS%2CSASSAFRAS BASICS%2CSASSAFRAS Curve%2CSASSAFRAS alt-laze%2CSASSAFRAS worklyf%2CTok...&searchQuery=${searchInput}`;
});