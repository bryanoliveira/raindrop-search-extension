function createSidebar(searchQuery, container) {
  const sidebarUrl = `https://app.raindrop.io/my/0/${encodeURIComponent(
    searchQuery
  )}`;
  const sidebar = document.createElement("iframe");
  sidebar.style.width = "100%";
  sidebar.style.height = "100%";
  sidebar.style.maxHeight = "400px";
  sidebar.style.border = "none";
  sidebar.style.overflow = "auto";
  sidebar.style.borderRadius = "4px";

  sidebar.src = sidebarUrl;

  // Wait for a short delay before appending the iframe to the sidebar
  setTimeout(function () {
    if (container) {
      const sidebarWrapper = document.createElement("div");
      sidebarWrapper.style.position = "relative";
      sidebarWrapper.style.top = "0";
      sidebarWrapper.style.right = "0";
      sidebarWrapper.style.marginBottom = "20px";
      sidebarWrapper.style.height = "400px";
      sidebarWrapper.style.maxHeight = "400px";
      sidebarWrapper.style.zIndex = "999999";
      sidebarWrapper.appendChild(sidebar);
      container.insertBefore(sidebarWrapper, container.firstChild);

      const closeButton = document.createElement("button");
      closeButton.innerHTML = "x";
      closeButton.style.position = "absolute";
      closeButton.style.top = "-10px";
      closeButton.style.right = "-10px";
      closeButton.style.background = "#333";
      closeButton.style.color = "white";
      closeButton.style.border = "none";
      closeButton.style.borderRadius = "50%";
      closeButton.style.width = "20px";
      closeButton.style.height = "20px";
      closeButton.style.cursor = "pointer";

      closeButton.addEventListener("click", function () {
        container.removeChild(sidebarWrapper);
      });
      sidebarWrapper.appendChild(closeButton);
    } else {
      console.warn("Could not find #rhs element on the page.");
    }
  }, 300); // Adjust the delay (in milliseconds) as needed
}

function getSearchQuery() {
  const searchBox = document.getElementById("searchbox");
  if (searchBox) {
    return searchBox.value;
  }
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get("q");
}

setTimeout(function () {
  const searchQuery = getSearchQuery();
  if (searchQuery) {
    const rhsContainer = document.getElementById("rhs");
    if (rhsContainer) {
      createSidebar(searchQuery, rhsContainer);
    } else {
      console.warn("Could not find #rhs element on the page.");
    }
  }
}, 300); // Adjust the delay (in milliseconds) as needed
