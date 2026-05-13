const button = document.getElementById('toggle-btn');
const paragraph = document.getElementById('toggle-paragraph');

button.addEventListener('click', () => {
    console.log('Button clicked');
  paragraph.style.display = paragraph.style.display === 'none' ? 'block' : 'none';
});