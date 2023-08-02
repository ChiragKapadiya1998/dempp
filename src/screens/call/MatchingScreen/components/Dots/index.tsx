import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import styles from '../../styles';

type Props = {
  color?: string;
};

const Dots = ({ color }: Props) => {
  const [dotsQty, setDotsQty] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotsQty((prev) => {
        if (prev === 3) return 0;
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Text style={[styles.dot, { ...(color && { color: color }) }, dotsQty < 1 ? styles.transparent : undefined]}>.</Text>
      <Text style={[styles.dot, { ...(color && { color: color }) }, dotsQty < 2 ? styles.transparent : undefined]}>.</Text>
      <Text style={[styles.dot, { ...(color && { color: color }) }, dotsQty < 3 ? styles.transparent : undefined]}>.</Text>
    </>
  );
};

export default Dots;
