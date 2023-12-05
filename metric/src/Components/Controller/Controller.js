import { Button, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './Controller.css'
import { useEffect, useState } from 'react';
const Controller = (props) => {
    const [queryList, SetQueryList] = useState([])
    const [period, setPeriod] = useState('realtime')
    const [periodInterval, setPeriodInterval] = useState('5s')
    const [intervalList, setIntervalList] = useState(['5s', '10s', '15s', '30s'])
    const onPeriodChange = (e) => {
        if (e.target.value) {
            setPeriod(e.target.value)
        }
    }
    const onIntervalChange = (e) => {
        if (e.target.value) {
            setPeriodInterval(e.target.value)
        }
    }

    const onSubmit = (e) => {
        console.log(e)
        console.log(e.target.name)
    }
    useEffect(() => {
        switch (period) {
            case "1min":
                setIntervalList(['1min', '5min', '10min', '15min'])
                setPeriodInterval('1min')
                break
            case "5min":
                setIntervalList(['5min', '10min', '15min'])
                setPeriodInterval('5min')
                break
            case "hour":
                setIntervalList(['1hour'])
                setPeriodInterval('1hour')
                break
            case "day":
                setIntervalList(['1day'])
                setPeriodInterval('1day')
                break
            case "month":
                setIntervalList(['1month'])
                setPeriodInterval('1month')
                break
            case "year":
                setIntervalList(['1year'])
                setPeriodInterval('1year')
                break
            default:
                setIntervalList(['5s', '10s', '15s', '30s'])
                setPeriodInterval('5s')
                break
        }
    }, [period])

    return (

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
                    {/* period를 선택하는 Select Form Control */}
                    <FormControl sx={{ m: 1, minWidth: 140, maxWidth: 140 }}>
                        <InputLabel id="period-label"> period </InputLabel>
                        <Select
                            labelId='period-label'
                            id='period-select'
                            label='period'
                            value={period}
                            onChange={onPeriodChange}
                        >
                            <MenuItem value='realtime'> realtime  </MenuItem>
                            <MenuItem value='1min'> 1min  </MenuItem>
                            <MenuItem value='5min'> 5min  </MenuItem>
                            <MenuItem value='hour'> hour  </MenuItem>
                            <MenuItem value='day'> day  </MenuItem>
                            <MenuItem value='month'> month  </MenuItem>
                            <MenuItem value='year'> year  </MenuItem>
                        </Select>
                    </FormControl>



                    {/* Period에 따른 Interval를 선택하는 FormControl*/}
                    <FormControl sx={{ m: 1, minWidth: 140, maxWidth: 140 }}>
                        <InputLabel id="interval-label"> interval </InputLabel>
                        <Select
                            labelId='interval-label'
                            id='interval-select'
                            label='interval'
                            value={periodInterval}
                            onChange={onIntervalChange}
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
                    <Button name='run' onClick={onSubmit}>
                        Run
                    </Button>

                </div>
            </div>
        </form>
    )
}
export default Controller;
// Controller는      PeriodSelect {realtime, 1m , 5m}  QueryButton, Interval {realtime 일 경우 , 1min 일 경우 5min 일 경우 다 다름} Select Run Button 
