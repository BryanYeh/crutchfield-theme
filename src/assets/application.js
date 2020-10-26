var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => {
  function closeDropdown() {
    document.querySelectorAll('.subnav').forEach(subnavLink => {
      subnavLink.classList.remove('border-red-600')
      subnavLink.classList.remove('border-solid')
      subnavLink.classList.remove('border-b-4')
      subnavLink.querySelector('span>i').classList.remove('transform')
      subnavLink.querySelector('span>i').classList.remove('rotate-180')
      subnavLink.querySelector('div').classList.add('hidden')
    })
  }

  document.querySelectorAll('.subnav').forEach(subnavLink => {
    subnavLink.addEventListener('click', (e) => {
      let shouldOpen = e.target.parentNode.classList.contains('subnav') && e.target.parentNode.querySelector('div').classList.contains('hidden')
      closeDropdown()

      let parent = e.target.parentNode
      if (parent.classList.contains('subnav') && shouldOpen) {
        parent.classList.toggle('border-red-600')
        parent.classList.toggle('border-solid')
        parent.classList.toggle('border-b-4')
        parent.querySelector('span>i').classList.toggle('transform')
        parent.querySelector('span>i').classList.toggle('rotate-180')
        parent.querySelector('div').classList.toggle('hidden')
      }
    })
  })

  window.onclick = function (e) {
    if (!e.target.matches('.subnav>span')) {
      closeDropdown()
    }
  }
});