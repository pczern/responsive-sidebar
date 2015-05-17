# responsive-sidebar
**JavaScript sidebar component using CSS3 for smooth animations
Coded without any JavaScript librarys for best performance
Supports most browsers including IE8**
## Usage
Embed responsive-sidebar.js in your .html file
```
<script src="responsive-sidebar.js" type="text/javascript"></script>
```
and call the constructor: Sidebar
```
<script type="text/javascript">
  var sidebar = new Sidebar('#sidebar', ['#sidebar-toggle'], 
          {
            time: 1000, // duration of the CSS animation in ms - default 1000
            width: '60%', // width of the sidebar in every CSS compatible notation - default 80%
            animationTimingFunction: 'cubic-bezier(.37,1,.71,.38)',  // specifies your sidebar CSS3 animation timing function - default ease-in
            overlayStyles: // Styles for the overlay (You can add every possible CSS style here)
            {
              backgroundColor: '#222',
              opacity: 0.9
            }
          }
        );
</script>
```
## Methods
```
- sidebar.open() // opens the sidebar
- sidebar.close() // closes the sidebar
- sidebar.dispose() // disposes listeners (not working in IE8)
```
## Features
- Open Source under the MIT license
- CSS3 Animations
- Provides fallback to support old browsers including IE8
- Uses absolute positioning because of bug in fixed positioning in most mobile browsers
