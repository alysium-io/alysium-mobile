# React Native Performance Profiling Guide

## 1. Built-in Developer Tools

### Enable Performance Monitor
```javascript
import { PerformanceObserver, performance } from 'react-native';

if (__DEV__) {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      console.log(`${entry.name}: ${entry.duration}ms`);
    });
  });
  observer.observe({ entryTypes: ['measure'] });
}
```

### Using Chrome DevTools
1. Enable Remote Debugging in your app
2. Open Chrome DevTools (CMD + Option + I on Mac)
3. Go to Performance tab
4. Record interactions and analyze flame chart

## 2. JavaScript Profiling

### Measure Component Render Time
```javascript
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    const start = performance.now();
    
    return () => {
      const end = performance.now();
      console.log(`Component render time: ${end - start}ms`);
    };
  });
  
  return <View>...</View>;
}
```

### Profile Specific Functions
```javascript
function measureFunction(fn, name) {
  return (...args) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    console.log(`${name} took ${end - start}ms`);
    return result;
  };
}

// Usage
const expensiveOperation = measureFunction(() => {
  // Your code here
}, 'expensiveOperation');
```

## 3. React Native Performance Tools

### Using Systrace
```bash
# Record trace for 10 seconds
react-native profile-hermes --record-trace

# Analyze in Chrome chrome://tracing
```

### Memory Profiling
```javascript
import { NativeModules } from 'react-native';

if (__DEV__) {
  const { HeapCapture } = NativeModules;
  HeapCapture.captureHeap('heap.json');
}
```

## 4. Common Performance Issues and Solutions

### 1. Large Lists
```javascript
import { VirtualizedList } from 'react-native';

// Use VirtualizedList or FlatList instead of ScrollView
<VirtualizedList
  data={items}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  renderItem={renderItem}
  getItem={(data, index) => data[index]}
  getItemCount={(data) => data.length}
  keyExtractor={(item) => item.id}
/>
```

### 2. Expensive Renders
```javascript
import { useMemo } from 'react';

function OptimizedComponent({ data }) {
  const processedData = useMemo(() => {
    return expensiveCalculation(data);
  }, [data]);

  return <View>{/* Use processedData */}</View>;
}
```

### 3. Image Optimization
```javascript
// Use appropriate resize mode and cache
<Image
  source={source}
  resizeMode="cover"
  fadeDuration={0}
  loadingIndicatorSource={placeholder}
  onLoad={() => console.log('Image loaded')}
/>
```

## 5. Debugging Tools

### Console Timing
```javascript
console.time('operationLabel');
// Your code here
console.timeEnd('operationLabel');
```

### React DevTools Profiler
```javascript
import { Profiler } from 'react';

<Profiler id="MyComponent" onRender={(id, phase, actualDuration) => {
  console.log(`${id} took ${actualDuration}ms to ${phase}`);
}}>
  <MyComponent />
</Profiler>
```

## 6. Performance Monitoring in Production

### Using Performance Marks
```javascript
performance.mark('startOperation');
// Your code here
performance.mark('endOperation');
performance.measure('operation', 'startOperation', 'endOperation');
```

### Error Boundary with Performance Logging
```javascript
class PerformanceErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    // Log performance metrics with error
    const perfEntries = performance.getEntriesByType('measure');
    console.error('Error with performance context:', error, perfEntries);
  }

  render() {
    return this.props.children;
  }
}
```