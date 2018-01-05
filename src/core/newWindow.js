let winF=null;
function newWindows(url, windowName) {
  let left = (screen.width - 1118) / 2;
  if(left < 0) left = 0;
  let top = (screen.height - 760) / 2;
  if(top < 0)top = 0;
  if (winF && !winF.closed) {
      winF.location.href = url;
      winF.focus();
  } else {
      winF = window.open(url, windowName, `height=550, width=600, top=${top}, left=${left}` );
      winF.focus();
    //
    // windowName.onclose = () => {
    //   windowName = null;
    // };
  }
}

export default newWindows;
