This system is designed to compensate of this weird issue...
Essentially, we use `onMomentScrollEnd` to play the video
each time we snap to a full screen video. You might think to yourself,
why not just "press play" inside of a `useEffect` which listens to
the `currentIndex`? And the answer is because, what happens if you
start a drag (pausing the video) but then return to the same index you
started with? In that case, we still need something to say "we have
snapped to an item, play the current video if there is one".

Ok, so we need something that catches all cases of "finishing the snap".

This is where `onMomentumScrollEnd` comes into play...

Here's the problem... when `currentIndex` is 0, we get the expected behavior.
However, every other index triggers `onMomentumScrollBegin` and `onMomentumScrollEnd`
even if the gesture is a single tap. This is a problem, because we have a wrapper
around the video component to detect taps so that the user can pause the video.
If you configure it like this, the "tap to pause" feature will not pause the video
because the `onMomentumScrollEnd` callback will be called immediately after
(given that we are at an index > 0).

So we have to solve for this...

So what we do here is we have a ref that we activate in the `onScrollBeginDrag`
callback. This callback is called when a scroll drag begins. This is how we will
know in the `onMomentumScrollEnd` that the user has entered a dragging state.
This will be the differentiator between whether the user has performed a tap
(they did NOT enter a dragging state) or whether they have truely made some sort of
pagination gesture (they DID enter a dragging state). If the `onMomentumScrollEnd`
function is called while this is true, then we can press play and reset this ref
to false.

This is obviously not the ideal way to handle this. The ideal way of handling this
is to have a callback that is called "after a pagination gesture has finished
regardless of whether or not the current index changes, and is smart enough
to not activate if the gesture is a tap."

And just to be clear, this ^ is the behavior at index 0, but not at any other index.
So I might just be dumb...