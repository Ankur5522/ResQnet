// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const paginator = ({data}) => {
//   return (
//     <View style={{flexDirection:'row',height:64}}>
//       {data.map((_,i)=>{
// return <View style={[styles.dictionary,{width:10}]} key={i.toString()} />
//       })}
//     </View>
//   )
// }

// export default paginator

// const styles = StyleSheet.create({

//     dot:{
//         height:10,
//         borderRadius:5,
//         backgroundColor:'#493d8a',
//         marginHorizontal:8,
//     },

// })

import React from 'react';
import { StyleSheet, View } from 'react-native';

const Paginator = ({ data, currentIndex }) => {
  return (
    <View style={{ flexDirection: 'row', height: 64 }}>
      {data.map((_, i) => (
        <View
          key={i.toString()}
          style={[
            styles.dot,
            {
              backgroundColor: i === currentIndex ? '#FFF' : '#A9A9A9', // Change the color for the active dot
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 6,
    width: 20, // Added width for the dots
    borderRadius: 5,
    backgroundColor: '#FFF', 
    marginHorizontal: 5,
    
  },
});

export default Paginator;
