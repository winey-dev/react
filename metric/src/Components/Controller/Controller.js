import { Button, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './Controller.css'
import { useEffect, useState } from 'react';
import { SelectPeriod, ChartArray } from '../../config/metric'

const Controller = (props) => {
    const { setData } = props
    const [period, setPeriod] = useState('realtime')
    const [periodInterval, setPeriodInterval] = useState('5s')
    const [intervalList, setIntervalList] = useState(['5s', '10s', '15s', '30s'])
    const [disable, setDisable] = useState(false)
    const [chart, setChart] = useState(ChartArray[0])
    const periodArray = Object.keys(SelectPeriod)

    const onSubmit = (e) => {
        e.preventDefault()
        if (e.target.name === 'run') {
            // SetInterval 
        } else {
            // Query 
            setData();
        }
    }

    useEffect(() => {
        if (SelectPeriod[period] && SelectPeriod[period].length) {
            setIntervalList(SelectPeriod[period])
            setPeriodInterval(SelectPeriod[period][0])
            setDisable(false)
        } else {
            setIntervalList(['none'])
            setPeriodInterval(['none'])
            setDisable(true)
        }
    }, [period])

    return (
        <div className='App'>
            <form onSubmit={onSubmit}>
                <div className='QueryBox'>
                    <div className=''> Query Box  </div>
                </div>
                <Divider />
                <div className='QueryController'>
                    {/* 빈 공간 차지  */}
                    <div className='SpaceSelector' />
                    {/* 빈 공간 차지  */}
                    <div className='RunSelector'>
                        {/* Common Chart 종류를 선택하는 Select Form Control */}
                        <FormControl sx={{ m: 1, minWidth: 140, maxWidth: 140 }}>
                            <InputLabel id="chart-label"> chart </InputLabel>
                            <Select
                                labelId='chart-label'
                                id='chart-select'
                                label='chart'
                                value={chart}
                                onChange={(e) => setChart(e.target.value)}
                            >
                                <MenuItem value=''> <em> none </em></MenuItem>
                                {
                                    ChartArray && ChartArray.map((item) => (
                                        <MenuItem key={item} value={item}> {item} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        {/* period를 선택하는 Select Form Control */}
                        <FormControl sx={{ m: 1, minWidth: 140, maxWidth: 140 }}>
                            <InputLabel id="period-label"> period </InputLabel>
                            <Select
                                labelId='period-label'
                                id='period-select'
                                label='period'
                                value={period}
                                onChange={(e) => setPeriod(e.target.value)}
                            >
                                {
                                    periodArray && periodArray.map((item) => (
                                        <MenuItem key={item} value={item}> {item} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        {/* Period에 따른 Interval를 선택하는 FormControl*/}
                        <FormControl sx={{ m: 1, minWidth: 140, maxWidth: 140 }} disabled={disable}>
                            <InputLabel id="interval-label"> interval </InputLabel>
                            <Select
                                labelId='interval-label'
                                id='interval-select'
                                label='interval'
                                value={periodInterval}
                                onChange={(e) => setPeriodInterval(e.target.value)}
                            >
                                {
                                    intervalList && intervalList.map((item) => (
                                        <MenuItem key={item} value={item}> {item} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <Button name='query' onClick={onSubmit}>
                            Query
                        </Button>
                        <Button name='run' onClick={onSubmit} disabled={disable}>
                            Run
                        </Button>

                    </div>
                </div>
            </form>
        </div>
    )
}
export default Controller;
// Controller는      PeriodSelect {realtime, 1m , 5m}  QueryButton, Interval {realtime 일 경우 , 1min 일 경우 5min 일 경우 다 다름} Select Run Button 
