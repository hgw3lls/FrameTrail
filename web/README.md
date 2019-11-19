# FrameTrail
## Open Hypervideo Environment

### Create, Annotate & Remix Interactive Videos

## Overview

FrameTrail let's you experience, manage & edit non-linear interactive video in a simple and extendable online environment. FrameTrail can be easily customized for different purposes and view modes. Our aim is to allow authors the creation of open timebased media formats, which make full use of current web technology and support the remix culture that the web is built on.

-----------------

## Features

### Editing
* Use any **HTML5 Video** or even an empty **Time Container** with a custom length as source
* Add any resource as timebased **Overlay** or **Annotation**
* Configure Overlay-Display (Opacity, etc.)
* **Synchronize** Video Overlays with the main Video / Time Container (optional)
* Add timebased **Videolinks** to other (internal or external) Hypervideo Documents
* View, compare and re-use Annotations of other users in the same project

### Managing
* Manage several **projects** with a custom user base and their own set of resources
* Manage project **users** (Access Rights, Activation)
* Manage **resources** (Add / Upload, Edit, Delete)
  * HTML5 Video (WEBM & MP4)
  * Image (JPG, PNG, GIF)
  * Wikipedia
  * Location (Open Streetmap)
  * Youtube Video
  * Vimeo Video
  * Any other Webpage URL
* Manage any number of **Hypervideo Documents** per project

### Data Policy
All data is kept in files using a structured JSON format, there is no database. Yes, that means you can just copy and paste your entire OHV instance (including all user data etc.) to another server and it will instantly work.

### Browser Support

#### Desktop:
* Latest Versions of Chrome and Firefox
* Safari, Opera and Microsoft Edge if you're lucky (not tested)
* Internet Explorer is not and won't be supported

#### Mobile:
* Editing Features are disabled on mobile platforms

-------------
## Installation

### Prerequisites

* **Apache** Web Server (2.2.29 +) with **PHP** (5.6.2 +)

(any other configuration might also be fine, but this one has been tested)

Please note that you can use FrameTrail "read-only" locally without any server, as long as your browser supports local Ajax requests (there are known issues with Chrome, but Firefox should work in most cases). Of course you won't be able to use the editing features.

### Setup

1. `git clone https://github.com/OpenHypervideo/FrameTrail` or **Download ZIP** to your **server directory** (i.e. `http://example.com/DIRECTORY-NAME` or `http://localhost/DIRECTORY-NAME` if you're using XAMMP, MAMP etc. for a local setup).
2. Open your **server directory** in your favourite browser.
3. Follow the instructions to define a global **master password** configure your FrameTrail instance.

### Getting Started

#### Adding a new project

1. Go to `http://example.com/DIRECTORY-NAME/projectmanager` and login with your global **master password**
2. Click "Add New Project" and follow the instructions

**Now something very important:**

Every project has a separate user base and resource archive. When you create a new project, you can add and manage users for that project. Those users only have access to that very project.

This means that **users always need to register per project** (including you). An account in one project doesn't exist in the other projects. Just see it as completely different installations, which you can manage through the project manager ;)

#### Adding a new hypervideo

1. Select your project in the **Project Manager** or go to `http://example.com/DIRECTORY-NAME/player/?project=PROJECTID`
2. In the Overview, click "New Hypervideo" and follow the instructions

#### Adding resources

1. In the Overview, click "Manage Resources" to open the **Resource Manager**
2. Click "Add Resource" and follow the instructions
3. When your resource has been added, you and other users can use it as basis for new Hypervideos or for Overlays & Annotations

-----------------

## FAQ

Check out [frametrail.org/faq.html](http://frametrail.org/faq.html)

-----------------

## Future Plans

Check out [frametrail.org/roadmap.html](http://frametrail.org/roadmap.html)

-----------------

## Developers

### Getting involved

Are you a developer and want to remix / improve / extend this software? Please head over to the [Contributors Guide](http://frametrail.org/contributing.html) and the [API Documentation](http://frametrail.org/docs.html).

If you find bugs or have questions, please file an issue here or if you can fix it yourself send us a pull request.

### Contributors

Joscha Jäger, Michael J. Zeder, Michael Morgenstern, Olivier Aubert 

-----------------

## License

**FrameTrail** is dual licensed under [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL v3](http://www.gnu.org/licenses/gpl-3.0.html) Licenses. 

For more info check out the [License Details](LICENSE.md).

-----------------
