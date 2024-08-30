import { View } from '@atomic';
import { Button } from '@molecules';
import { DualSlider, Histogram as OHistogram, Slider } from '@organisms';
import * as _ from 'lodash';
import React, { useState } from 'react';
import { SlideEvent } from 'src/components/organisms/Slider/settings';

const Histogram = () => {
	const [data, setData] = useState(
		_.times(10, () => ({
			value: Math.random(),
			color: `rgba(0, 0, 0, 0.4)`
		}))
	);

	const [dualData, setDualData] = useState(
		_.times(25, () => ({
			value: Math.random(),
			color: `rgba(0, 0, 0, 1)`
		}))
	);

	const getRandomColor = () =>
		`rgba(${_.random(0, 255)}, ${_.random(0, 255)}, ${_.random(0, 255)}, 1)`;

	const randomizeHeights = () => {
		setData([...data.map((d) => ({ ...d, value: Math.random() }))]);
	};

	const getData = () => _.cloneDeep(data);

	const setRandomColor = (index: number) => {
		const newData = getData();
		const newColor = getRandomColor();
		newData[index].color = newColor;
		setData(newData);
	};

	const addItem = () => {
		const newData = [...data];
		newData.push({
			value: Math.random(),
			color: getRandomColor()
		});
		setData(newData);
	};

	const removeItem = () => {
		const newData = [...data];
		newData.pop();
		setData(newData);
	};

	const completeRandomization = () => {
		// Calculate random number between 5-12
		var newData = [];
		for (var i = 0; i < _.random(5, 12); i++) {
			newData.push({
				value: _.random(0, 1, true),
				color: getRandomColor()
			});
		}
		setData(newData);
	};

	const onChangeSlider = (event: SlideEvent) => {
		const stepActivityMapState = event.stepActivityMapState;
		if (stepActivityMapState) {
			const newData = data.map((d, i) => {
				const currentStep = stepActivityMapState[i];
				let alpha = 1;
				if (!currentStep.isActive) {
					alpha = 0.4;
				}

				const [r, g, b] = d.color
					.slice(5, -1)
					.split(',')
					.map((c) => parseInt(c));
				return { ...d, color: `rgba(${r}, ${g}, ${b}, ${alpha})` };
			});
			setData(newData);
		}
	};

	const onChangeDualSlider = (event: SlideEvent) => {
		const stepActivityMapState = event.stepActivityMapState;
		if (stepActivityMapState) {
			const newData = dualData.map((d, i) => {
				const currentStep = stepActivityMapState[i];
				if (currentStep.isActive) {
					return { ...d, color: 'rgba(0, 0, 0, 1)' };
				} else {
					return { ...d, color: 'rgba(0, 0, 0, 0.4)' };
				}
			});
			setDualData(newData);
		}
	};

	return (
		<View margin='m'>
			<OHistogram data={data} settings={{ barMargin: 2 }} />
			<OHistogram data={dualData} settings={{ barMargin: 1, barRadius: 3 }} />
			<View marginVertical='m'>
				<Button text='Randomize Heights' onPress={randomizeHeights} />
			</View>
			<View flexDirection='row' justifyContent='space-between' marginBottom='m'>
				<View flex={1}>
					<Button text='Color 1' onPress={() => setRandomColor(0)} />
				</View>
				<View flex={1} marginHorizontal='m'>
					<Button text='Color 2' onPress={() => setRandomColor(1)} />
				</View>
				<View flex={1}>
					<Button text='Color 3' onPress={() => setRandomColor(2)} />
				</View>
			</View>
			<View flexDirection='row' justifyContent='space-between' marginBottom='m'>
				<View flex={1} marginRight='m'>
					<Button text='Add Item' onPress={addItem} />
				</View>
				<View flex={1} marginLeft='m'>
					<Button text='Remove Item' onPress={removeItem} />
				</View>
			</View>
			<View marginBottom='m'>
				<Button text='Complete Randomization' onPress={completeRandomization} />
			</View>
			<View marginBottom='m'>
				<Slider
					settings={{
						steps: data.length + 1,
						rightInclusive: false,
						includeMarkers: false
					}}
					defaultIndex={0}
					onChange={onChangeSlider}
				/>
			</View>
			<View>
				<DualSlider
					settings={{
						steps: dualData.length
					}}
					onChange={onChangeDualSlider}
				/>
			</View>
		</View>
	);
};

export default Histogram;
