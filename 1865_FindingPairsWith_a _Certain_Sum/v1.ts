class FindSumPairs {
    private map = new Map<number, number>();
    private nums1: number[];
    private nums2: number[];

    constructor(nums1: number[], nums2: number[]) {
        this.nums1 = nums1.sort((a, b) => a - b);
        this.nums2 = nums2;

        for (const num of nums2) {
            this.map.set(num, (this.map.get(num) ?? 0) + 1);
        }
    }

    add(index: number, val: number): void {
        const oldValue = this.nums2[index];
        this.nums2[index] += val;
        this.map.set(oldValue, (this.map.get(oldValue) ?? 0) - 1);
        this.map.set(this.nums2[index], (this.map.get(this.nums2[index]) ?? 0) + 1);
    }

    count(tot: number): number {
        let count = 0;

        for(const num of this.nums1) {
            if(num > tot) return count;
            count += this.map.get(tot - num) ?? 0;
        }

        return count;
    }
}

/**
 * Your FindSumPairs object will be instantiated and called as such:
 * var obj = new FindSumPairs(nums1, nums2)
 * obj.add(index,val)
 * var param_2 = obj.count(tot)
 */