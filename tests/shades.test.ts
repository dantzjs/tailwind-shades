import { expect, test } from 'vitest'
import { shadesOf } from '../src/main'

test('Shade [50] for #ff0000 must be #ffe6e6', () => {
    expect(shadesOf('#ff0000')[50]).toBe('#ffe6e6')
})

test('Shade [600] for #800 must be #660600', () => {
    expect(shadesOf('#800')[600]).toBe('#660600')
})

test('Half Shade [50] for #ff0000 must be #ffe6e6 and [150] must be #ffb3b3', () => {
    expect(shadesOf('#ff0000', { halfShades: true })[50]).toBe('#ffe6e6')
    expect(shadesOf('#ff0000', { halfShades: true })[150]).toBe('#ffb3b3')
})

test('Must create 19 shades, including half shades', () => {
    expect(Object.values(shadesOf('#ff0000', { halfShades: true })).length).toBe(19)
})

test('Shade [600] for #800 and format rgb must be 102 6 0', () => {
    expect(shadesOf('#800', { format: 'rgb'})[600]).toBe('102 6 0')
})

test('Shade [50] for #ff0000 and format rgb must be 255 230 230', () => {
    expect(shadesOf('#ff0000', { format: 'rgb'})[50]).toBe('255 230 230')
})